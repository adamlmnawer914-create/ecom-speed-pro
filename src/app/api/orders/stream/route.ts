/**
 * SSE Stream endpoint for real-time order notifications.
 * Used by the admin dashboard for instant new order alerts and status updates.
 * Connects via: GET /api/orders/stream?token=...
 */
import { NextRequest } from "next/server";
import { getOrderBroadcaster, OrderEvent } from "@/lib/broadcast";
import { getAllOrders } from "@/lib/db";

const ADMIN_TOKEN = "ESP_SECURE_DESKTOP_TOKEN_2026_9f8d1c7a4b";

export async function GET(req: NextRequest) {
  // Auth check
  const token =
    req.nextUrl.searchParams.get("token") ||
    req.headers.get("x-desktop-auth-token");
  if (token !== ADMIN_TOKEN) {
    return new Response(JSON.stringify({ error: "غير مصرح" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  const broadcaster = getOrderBroadcaster();
  const encoder = new TextEncoder();
  let listener: ((event: OrderEvent) => void) | null = null;
  let heartbeatTimer: NodeJS.Timeout | null = null;
  let pollTimer: NodeJS.Timeout | null = null;
  let lastOrderIds = new Set<string>();

  const stream = new ReadableStream({
    async start(controller) {
      // 1. Initial connection handshake
      controller.enqueue(
        encoder.encode(`event: connected\ndata: ${JSON.stringify({ status: "ok", ts: Date.now() })}\n\n`)
      );

      // Initialize baseline known IDs
      try {
        const initial = await getAllOrders();
        initial.forEach((o) => lastOrderIds.add(o.id));
      } catch (e) {}

      // 2. Direct event listener for instant 0ms latency
      listener = (event: OrderEvent) => {
        try {
          if (event.type === "ORDER_CREATED" && event.order) {
            lastOrderIds.add(event.order.id);
            controller.enqueue(
              encoder.encode(`event: new_order\ndata: ${JSON.stringify(event.order)}\n\n`)
            );
          } else if (event.type === "ORDER_UPDATED" && event.order) {
            controller.enqueue(
              encoder.encode(`event: order_updated\ndata: ${JSON.stringify(event.order)}\n\n`)
            );
          } else if (event.type === "ORDER_DELETED") {
            if (event.orderId) lastOrderIds.delete(event.orderId);
            controller.enqueue(
              encoder.encode(`event: order_deleted\ndata: ${JSON.stringify({ orderId: event.orderId })}\n\n`)
            );
          }
        } catch (e) {
          // Stream controller may be closed
        }
      };

      broadcaster.on("order_event", listener);

      // 3. Keepalive heartbeat ping every 15s
      heartbeatTimer = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`event: ping\ndata: ${Date.now()}\n\n`));
        } catch (e) {
          if (heartbeatTimer) clearInterval(heartbeatTimer);
        }
      }, 15000);

      // 4. Polling safeguard every 4s to catch any external writes
      pollTimer = setInterval(async () => {
        try {
          const fresh = await getAllOrders();
          const currentIds = new Set(fresh.map((o) => o.id));

          // Check for any newly added order not captured by in-memory broadcaster
          for (const order of fresh) {
            if (!lastOrderIds.has(order.id)) {
              lastOrderIds.add(order.id);
              controller.enqueue(
                encoder.encode(`event: new_order\ndata: ${JSON.stringify(order)}\n\n`)
              );
            }
          }
          lastOrderIds = currentIds;
        } catch (e) {
          // Skip loop errors
        }
      }, 4000);
    },
    cancel() {
      if (listener) broadcaster.off("order_event", listener);
      if (heartbeatTimer) clearInterval(heartbeatTimer);
      if (pollTimer) clearInterval(pollTimer);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-store, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
