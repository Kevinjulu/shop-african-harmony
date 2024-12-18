create type product_status as enum ('draft', 'published', 'out_of_stock');

create table products (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text,
  price decimal(10,2) not null,
  status product_status not null default 'draft',
  inventory_count integer not null default 0,
  category_id uuid references categories(id),
  images text[] default array[]::text[],
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create categories table
create table categories (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  slug text not null unique,
  description text,
  parent_id uuid references categories(id),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Add RLS policies
alter table products enable row level security;
alter table categories enable row level security;

-- Policies for products
create policy "Products are viewable by everyone"
  on products for select
  using (true);

create policy "Products are insertable by authenticated users with admin role"
  on products for insert
  to authenticated
  using (exists (
    select 1 from auth.users
    where auth.uid() = id
    and raw_user_meta_data->>'role' = 'admin'
  ));

create policy "Products are updatable by authenticated users with admin role"
  on products for update
  to authenticated
  using (exists (
    select 1 from auth.users
    where auth.uid() = id
    and raw_user_meta_data->>'role' = 'admin'
  ));

create policy "Products are deletable by authenticated users with admin role"
  on products for delete
  to authenticated
  using (exists (
    select 1 from auth.users
    where auth.uid() = id
    and raw_user_meta_data->>'role' = 'admin'
  ));

-- Policies for categories
create policy "Categories are viewable by everyone"
  on categories for select
  using (true);

create policy "Categories are insertable by authenticated users with admin role"
  on categories for insert
  to authenticated
  using (exists (
    select 1 from auth.users
    where auth.uid() = id
    and raw_user_meta_data->>'role' = 'admin'
  ));

create policy "Categories are updatable by authenticated users with admin role"
  on categories for update
  to authenticated
  using (exists (
    select 1 from auth.users
    where auth.uid() = id
    and raw_user_meta_data->>'role' = 'admin'
  ));

create policy "Categories are deletable by authenticated users with admin role"
  on categories for delete
  to authenticated
  using (exists (
    select 1 from auth.users
    where auth.uid() = id
    and raw_user_meta_data->>'role' = 'admin'
  ));