import { getOrderBroadcaster, OrderEvent } from "@/lib/broadcast";
import { isAuthorizedDesktopRequest } from "@/lib/security";

export async function GET(req: Request) {
  // Check authorization
  if (!isAuthorizedDesktopRequest(req)) {
    return new Response(
      JSON.stringify({ success: false, message: "غير مصرح بالاتصال الحي" }),
      { status: 403, headers: { "Content-Type": "application/json" } }
    );
  }

  const broadcaster = getOrderBroadcaster();
  const encoder = new TextEncoder();

  let listener: ((event: OrderEvent) => void) | null = null;
  let heartbeatTimer: NodeJS.Timeout | null = null;

  const stream = new ReadableStream({
    start(controller) {
      // Send initial connection event
      const initMessage = `data: ${JSON.stringify({ type: "CONNECTED", timestamp: Date.now() })}\n\n`;
      controller.enqueue(encoder.encode(initMessage));

      // Order event listener
      listener = (event: OrderEvent) => {
        try {
          const payload = `data: ${JSON.stringify(event)}\n\n`;
          controller.enqueue(encoder.encode(payload));
        } catch (e) {
          // Stream might be closed
        }
      };

      broadcaster.on("order_event", listener);

      // Keepalive heartbeat ping every 15 seconds
      heartbeatTimer = setInterval(() => {
        try {
          controller.enqueue(encoder.encode(`: ping\n\n`));
        } catch (e) {
          if (heartbeatTimer) clearInterval(heartbeatTimer);
        }
      }, 15000);
    },
    cancel() {
      if (listener) broadcaster.off("order_event", listener);
      if (heartbeatTimer) clearInterval(heartbeatTimer);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform, no-store",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
