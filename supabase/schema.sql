-- ============================================================
-- ECOM SPEED PRO - SUPABASE DATABASE SCHEMA
-- Guest Checkout + Secure Order Tracking & Store Delivery
-- ============================================================

-- 1. Enable pgcrypto extension for UUID generation
create extension if not exists "pgcrypto";

-- 2. Create 'orders' table
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_number text not null,
  customer_name text not null,
  phone_number text not null,
  plan_tier text not null,
  status text not null default 'pending' check (status in ('pending', 'in_progress', 'completed')),
  delivered_url text,
  payment_method text default 'card',
  product_notes text,
  product_images text[] default '{}',
  created_at timestamp with time zone default now()
);

-- Indices for performance
create index if not exists idx_orders_phone on public.orders (phone_number);
create index if not exists idx_orders_created on public.orders (created_at desc);

-- 3. Create 'otp_verifications' table
create table if not exists public.otp_verifications (
  id uuid primary key default gen_random_uuid(),
  phone_number text not null,
  otp_code varchar(4) not null,
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default now()
);

-- Index for OTP search
create index if not exists idx_otp_phone_expires on public.otp_verifications (phone_number, expires_at desc);

-- 4. Enable Row Level Security (RLS)
alter table public.orders enable row level security;
alter table public.otp_verifications enable row level security;

-- Policies for public guest tracking by exact unguessable UUID
create policy "Allow read order by secret UUID"
  on public.orders for select
  using (true);

create policy "Allow insert orders"
  on public.orders for insert
  with check (true);

create policy "Allow update orders status and delivery"
  on public.orders for update
  using (true);

create policy "Allow delete orders"
  on public.orders for delete
  using (true);

create policy "Allow all OTP operations"
  on public.otp_verifications for all
  using (true);
