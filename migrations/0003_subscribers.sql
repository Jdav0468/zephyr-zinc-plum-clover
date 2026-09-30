create table if not exists subscribers (
  email text primary key,
  created_at timestamptz not null default now()
);
