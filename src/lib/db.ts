import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export interface Order {
  id: string; // UUID primary key & unguessable tracking link
  order_number: string; // Serial display format e.g. #ESP-101
  customer_name: string;
  phone_number: string;
  plan_tier: string; // e.g. "500 MAD" | "1500 MAD" | "5000 MAD"
  status: "pending" | "in_progress" | "completed";
  delivered_url: string | null;
  payment_method?: string;
  product_notes?: string;
  product_images?: string[];
  created_at: string;
}

export interface OtpVerification {
  id: string;
  phone_number: string;
  otp_code: string;
  expires_at: string;
  created_at: string;
}

// Supabase client (only initialized if credentials provided)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase =
  supabaseUrl && supabaseKey
    ? createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
      })
    : null;

// In-memory runtime cache for warm instances
declare global {
  var __ECOM_ORDERS_CACHE__: Order[] | undefined;
  var __ECOM_OTP_CACHE__: OtpVerification[] | undefined;
  var __ECOM_DELETED_CACHE__: Set<string> | undefined;
}

const LOCAL_ORDERS_FILE = path.join(process.cwd(), "data", "orders.json");
const TMP_ORDERS_FILE = path.join("/tmp", "orders.json");

const LOCAL_OTP_FILE = path.join(process.cwd(), "data", "otp.json");
const TMP_OTP_FILE = path.join("/tmp", "otp.json");

const LOCAL_DELETED_FILE = path.join(process.cwd(), "data", "deleted_orders.json");
const TMP_DELETED_FILE = path.join("/tmp", "deleted_orders.json");

function ensureDir(filePath: string) {
  try {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  } catch (e) {
    // Read-only filesystem on Vercel
  }
}

function getDeletedIds(): Set<string> {
  if (globalThis.__ECOM_DELETED_CACHE__) {
    return globalThis.__ECOM_DELETED_CACHE__;
  }
  const set = new Set<string>();
  try {
    if (fs.existsSync(TMP_DELETED_FILE)) {
      const data = JSON.parse(fs.readFileSync(TMP_DELETED_FILE, "utf-8"));
      if (Array.isArray(data)) data.forEach((item: string) => set.add(item));
    }
  } catch (e) {}

  try {
    if (fs.existsSync(LOCAL_DELETED_FILE)) {
      const data = JSON.parse(fs.readFileSync(LOCAL_DELETED_FILE, "utf-8"));
      if (Array.isArray(data)) data.forEach((item: string) => set.add(item));
    }
  } catch (e) {}

  globalThis.__ECOM_DELETED_CACHE__ = set;
  return set;
}

function recordDeletedId(id: string) {
  if (!id) return;
  const set = getDeletedIds();
  const clean = id.trim();
  set.add(clean);
  set.add(clean.replace(/^#/, ""));
  set.add("#" + clean.replace(/^#/, ""));

  const arr = Array.from(set);
  const json = JSON.stringify(arr, null, 2);

  try {
    ensureDir(TMP_DELETED_FILE);
    fs.writeFileSync(TMP_DELETED_FILE, json, "utf-8");
  } catch (e) {}

  try {
    ensureDir(LOCAL_DELETED_FILE);
    fs.writeFileSync(LOCAL_DELETED_FILE, json, "utf-8");
  } catch (e) {}
}

// ----------------------------------------------------
// LOCAL & SERVERLESS FALLBACK HELPERS
// ----------------------------------------------------
function readLocalOrders(): Order[] {
  // 1. Check in-memory cache
  if (globalThis.__ECOM_ORDERS_CACHE__ && globalThis.__ECOM_ORDERS_CACHE__.length > 0) {
    return globalThis.__ECOM_ORDERS_CACHE__;
  }

  let rawList: any[] = [];

  // 2. Try /tmp/orders.json (Vercel writable layer)
  try {
    if (fs.existsSync(TMP_ORDERS_FILE)) {
      const data = fs.readFileSync(TMP_ORDERS_FILE, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        rawList = parsed;
      }
    }
  } catch (e) {}

  // 3. Fallback to bundled data/orders.json
  if (rawList.length === 0) {
    try {
      if (fs.existsSync(LOCAL_ORDERS_FILE)) {
        const data = fs.readFileSync(LOCAL_ORDERS_FILE, "utf-8");
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          rawList = parsed;
        }
      }
    } catch (e) {}
  }

  const deletedSet = getDeletedIds();
  const validRaw = rawList.filter((item: any) => {
    if (!item) return false;
    const id = item.id;
    const num = item.order_number || item.orderNumber;
    return !deletedSet.has(id) && (!num || !deletedSet.has(num));
  });

  const mapped: Order[] = validRaw.map((item: any) => ({
    id: item.id || crypto.randomUUID(),
    order_number: item.order_number || item.orderNumber || `#ESP-${item.id?.slice(0, 6) || "101"}`,
    customer_name: item.customer_name || item.customerName || "عميل مميز",
    phone_number: item.phone_number || item.customerPhone || item.phone || "",
    plan_tier: item.plan_tier || item.planTitle || item.plan || "المتجر القياسي (1,500 MAD)",
    status: (item.status === "paid" || item.status === "completed") ? "completed" : (item.status === "in_progress" ? "in_progress" : "pending"),
    delivered_url: item.delivered_url || item.deliveredUrl || null,
    payment_method: item.payment_method || item.paymentMethod || "بطاقة بنكية",
    product_notes: item.product_notes || item.productNotes || "",
    product_images: item.product_images || item.productImages || [],
    created_at: item.created_at || item.createdAt || new Date().toISOString(),
  }));

  globalThis.__ECOM_ORDERS_CACHE__ = mapped;
  return mapped;
}

function writeLocalOrders(orders: Order[]): void {
  // Always update in-memory cache first
  globalThis.__ECOM_ORDERS_CACHE__ = orders;

  const content = JSON.stringify(orders, null, 2);

  // Try /tmp (works in Vercel / serverless)
  try {
    ensureDir(TMP_ORDERS_FILE);
    fs.writeFileSync(TMP_ORDERS_FILE, content, "utf-8");
  } catch (e) {}

  // Try local repo file
  try {
    ensureDir(LOCAL_ORDERS_FILE);
    fs.writeFileSync(LOCAL_ORDERS_FILE, content, "utf-8");
  } catch (e) {}
}

function readLocalOtp(): OtpVerification[] {
  if (globalThis.__ECOM_OTP_CACHE__ && globalThis.__ECOM_OTP_CACHE__.length > 0) {
    return globalThis.__ECOM_OTP_CACHE__;
  }

  let rawList: any[] = [];
  try {
    if (fs.existsSync(TMP_OTP_FILE)) {
      rawList = JSON.parse(fs.readFileSync(TMP_OTP_FILE, "utf-8"));
    }
  } catch (e) {}

  if (rawList.length === 0) {
    try {
      if (fs.existsSync(LOCAL_OTP_FILE)) {
        rawList = JSON.parse(fs.readFileSync(LOCAL_OTP_FILE, "utf-8"));
      }
    } catch (e) {}
  }

  globalThis.__ECOM_OTP_CACHE__ = Array.isArray(rawList) ? rawList : [];
  return globalThis.__ECOM_OTP_CACHE__;
}

function writeLocalOtp(otps: OtpVerification[]): void {
  globalThis.__ECOM_OTP_CACHE__ = otps;
  const content = JSON.stringify(otps, null, 2);

  try {
    ensureDir(TMP_OTP_FILE);
    fs.writeFileSync(TMP_OTP_FILE, content, "utf-8");
  } catch (e) {}

  try {
    ensureDir(LOCAL_OTP_FILE);
    fs.writeFileSync(LOCAL_OTP_FILE, content, "utf-8");
  } catch (e) {}
}

// ----------------------------------------------------
// DATABASE API (SUPABASE + FAILOVER HYBRID)
// ----------------------------------------------------

/**
 * Fetch a single order by its secret UUID
 */
export async function getOrderById(id: string): Promise<Order | null> {
  const deletedSet = getDeletedIds();
  if (
    deletedSet.has(id) ||
    deletedSet.has(id.replace(/^#/, "")) ||
    deletedSet.has("#" + id.replace(/^#/, ""))
  ) {
    return null;
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (!error && data) {
        if (deletedSet.has(data.id) || (data.order_number && deletedSet.has(data.order_number))) {
          return null;
        }
        return data as Order;
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local storage:", err);
    }
  }

  // Fallback to local
  const orders = readLocalOrders();
  const found = orders.find((o) => o.id === id || o.order_number === id);
  if (found && (deletedSet.has(found.id) || deletedSet.has(found.order_number))) {
    return null;
  }
  return found || null;
}

/**
 * Fetch all orders associated with a phone number (sanitized)
 */
export async function getOrdersByPhone(phoneNumber: string): Promise<Order[]> {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const deletedSet = getDeletedIds();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        return (data as Order[]).filter((o) => {
          if (!o || deletedSet.has(o.id) || (o.order_number && deletedSet.has(o.order_number))) {
            return false;
          }
          const oPhone = (o.phone_number || "").replace(/[^0-9]/g, "");
          return oPhone.includes(cleanPhone) || cleanPhone.includes(oPhone);
        });
      }
    } catch (err) {
      console.warn("Supabase fetch by phone failed, falling back to local:", err);
    }
  }

  // Fallback to local
  const orders = readLocalOrders();
  return orders.filter((o) => {
    if (!o || deletedSet.has(o.id) || (o.order_number && deletedSet.has(o.order_number))) {
      return false;
    }
    const oPhone = (o.phone_number || "").replace(/[^0-9]/g, "");
    return oPhone.includes(cleanPhone) || cleanPhone.includes(oPhone);
  });
}

/**
 * Fetch all orders (for admin dashboard)
 */
export async function getAllOrders(): Promise<Order[]> {
  const deletedSet = getDeletedIds();

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && Array.isArray(data)) {
        return (data as Order[]).filter(
          (o) =>
            o &&
            o.id &&
            !deletedSet.has(o.id) &&
            (!o.order_number || !deletedSet.has(o.order_number))
        );
      }
    } catch (err) {
      console.warn("Supabase fetch all failed, falling back to local:", err);
    }
  }

  const local = readLocalOrders();
  return local.filter(
    (o) =>
      o &&
      o.id &&
      !deletedSet.has(o.id) &&
      (!o.order_number || !deletedSet.has(o.order_number))
  );
}

/**
 * Create a new order with a secure UUID
 */
export async function createOrder(data: Partial<Order>): Promise<Order> {
  const deletedSet = getDeletedIds();
  let newId = data.id || crypto.randomUUID();
  if (deletedSet.has(newId)) {
    newId = crypto.randomUUID();
  }

  const existing = readLocalOrders();
  const nextSeq = existing.length + 101;
  const orderNumber = data.order_number || `#ESP-${nextSeq}`;

  const newOrder: Order = {
    id: newId,
    order_number: orderNumber,
    customer_name: data.customer_name || "عميل مميز",
    phone_number: data.phone_number || "",
    plan_tier: data.plan_tier || "المتجر القياسي (1,500 MAD)",
    status: data.status || "pending",
    delivered_url: data.delivered_url || null,
    payment_method: data.payment_method || "بطاقة بنكية",
    product_notes: data.product_notes || "",
    product_images: data.product_images || [],
    created_at: data.created_at || new Date().toISOString(),
  };

  // Always persist locally for redundancy
  writeLocalOrders([newOrder, ...existing.filter((o) => o.id !== newOrder.id)]);

  if (supabase) {
    try {
      const { data: inserted, error } = await supabase
        .from("orders")
        .insert([newOrder])
        .select()
        .single();

      if (!error && inserted) {
        return inserted as Order;
      }
    } catch (err) {
      console.warn("Supabase insert order failed:", err);
    }
  }

  return newOrder;
}

/**
 * Update an order (e.g. status, delivered_url)
 */
export async function updateOrder(id: string, updates: Partial<Order>): Promise<Order | null> {
  const orders = readLocalOrders();
  const index = orders.findIndex((o) => o.id === id);

  let updatedOrder: Order | null = null;
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates };
    writeLocalOrders(orders);
    updatedOrder = orders[index];
  }

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (!error && data) {
        return data as Order;
      }
    } catch (err) {
      console.warn("Supabase update order failed:", err);
    }
  }

  return updatedOrder;
}

/**
 * Delete an order permanently
 */
export async function deleteOrder(id: string): Promise<boolean> {
  recordDeletedId(id);

  const orders = readLocalOrders();
  const target = orders.find((o) => o.id === id || o.order_number === id);
  if (target?.order_number) recordDeletedId(target.order_number);
  if (target?.id) recordDeletedId(target.id);

  const filtered = orders.filter((o) => o.id !== id && o.order_number !== id);
  writeLocalOrders(filtered);

  if (supabase) {
    try {
      await supabase.from("orders").delete().eq("id", id);
      if (target?.order_number) {
        await supabase.from("orders").delete().eq("order_number", target.order_number);
      }
    } catch (err) {
      console.warn("Supabase delete failed:", err);
    }
  }

  return true;
}

/**
 * Delete all orders belonging to a customer permanently
 */
export async function deleteCustomerOrders(phoneNumber: string, customerName?: string): Promise<boolean> {
  const cleanPhone = phoneNumber ? phoneNumber.replace(/[^0-9]/g, "") : "";
  const cleanName = customerName ? customerName.trim().toLowerCase() : "";

  const orders = readLocalOrders();
  const toDelete = orders.filter((o) => {
    const oPhone = (o.phone_number || "").replace(/[^0-9]/g, "");
    const matchPhone = cleanPhone && cleanPhone.length >= 6 && (oPhone.includes(cleanPhone) || cleanPhone.includes(oPhone));
    const matchName = cleanName && o.customer_name.trim().toLowerCase() === cleanName;
    return matchPhone || matchName;
  });

  toDelete.forEach((o) => {
    recordDeletedId(o.id);
    if (o.order_number) recordDeletedId(o.order_number);
  });

  const remaining = orders.filter((o) => !toDelete.some((d) => d.id === o.id));
  writeLocalOrders(remaining);

  if (supabase) {
    try {
      const ids = toDelete.map((o) => o.id);
      if (ids.length > 0) {
        await supabase.from("orders").delete().in("id", ids);
      }
      if (cleanPhone && cleanPhone.length >= 6) {
        await supabase.from("orders").delete().ilike("phone_number", `%${cleanPhone}%`);
      }
      if (cleanName) {
        await supabase.from("orders").delete().ilike("customer_name", `%${cleanName}%`);
      }
    } catch (err) {
      console.warn("Supabase customer delete failed:", err);
    }
  }

  return true;
}

// ----------------------------------------------------
// OTP VERIFICATION FUNCTIONS (5-MINUTE EXPIRY)
// ----------------------------------------------------

/**
 * Generate and store a 4-digit OTP code with 5 minutes validity
 */
export async function createOtp(phoneNumber: string): Promise<{ code: string; expiresAt: string }> {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  // Generate random 4-digit numeric code
  const code = Math.floor(1000 + Math.random() * 9000).toString();
  // 5 minutes expiry
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  const otpRecord: OtpVerification = {
    id: crypto.randomUUID(),
    phone_number: cleanPhone,
    otp_code: code,
    expires_at: expiresAt,
    created_at: new Date().toISOString(),
  };

  // Local storage save
  const otps = readLocalOtp().filter((o) => new Date(o.expires_at).getTime() > Date.now());
  writeLocalOtp([otpRecord, ...otps]);

  if (supabase) {
    try {
      await supabase.from("otp_verifications").insert([otpRecord]);
    } catch (err) {
      console.warn("Supabase insert OTP failed:", err);
    }
  }

  return { code, expiresAt };
}

/**
 * Verify an OTP code for a given phone number
 */
export async function verifyOtp(phoneNumber: string, enteredCode: string): Promise<boolean> {
  const cleanPhone = phoneNumber.replace(/[^0-9]/g, "");
  const trimmedCode = enteredCode.trim();

  // 1. Check Supabase
  if (supabase) {
    try {
      const now = new Date().toISOString();
      const { data, error } = await supabase
        .from("otp_verifications")
        .select("*")
        .eq("phone_number", cleanPhone)
        .eq("otp_code", trimmedCode)
        .gte("expires_at", now)
        .order("created_at", { ascending: false })
        .limit(1);

      if (!error && Array.isArray(data) && data.length > 0) {
        return true;
      }
    } catch (err) {
      console.warn("Supabase OTP verify error:", err);
    }
  }

  // 2. Check local fallback
  const nowTime = Date.now();
  const otps = readLocalOtp();
  const valid = otps.find(
    (o) =>
      o.phone_number === cleanPhone &&
      o.otp_code === trimmedCode &&
      new Date(o.expires_at).getTime() > nowTime
  );

  return Boolean(valid);
}
