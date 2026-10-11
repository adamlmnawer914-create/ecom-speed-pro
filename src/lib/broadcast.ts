import { EventEmitter } from "events";
import { Order } from "./db";

declare global {
  var __ECOM_BROADCASTER__: EventEmitter | undefined;
}

export interface OrderEvent {
  type: "ORDER_CREATED" | "ORDER_UPDATED" | "ORDER_DELETED";
  order?: Order;
  orderId?: string;
  timestamp: number;
}

export function getOrderBroadcaster(): EventEmitter {
  if (!globalThis.__ECOM_BROADCASTER__) {
    globalThis.__ECOM_BROADCASTER__ = new EventEmitter();
    globalThis.__ECOM_BROADCASTER__.setMaxListeners(100);
  }
  return globalThis.__ECOM_BROADCASTER__;
}

export function broadcastOrderEvent(event: OrderEvent) {
  try {
    const emitter = getOrderBroadcaster();
    emitter.emit("order_event", event);
  } catch (err) {
    console.warn("Broadcast event error:", err);
  }
}
