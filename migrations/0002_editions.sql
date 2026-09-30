create table if not exists editions (
  slug text primary key,
  edition_date date not null unique,
  status text not null,
  attempts integer not null default 0,
  title text,
  dek text,
  desk text,
  minutes integer,
  plain text,
  blocks jsonb,
  sources jsonb,
  error text,
  started_at timestamptz not null default now(),
  ready_at timestamptz
);

create table if not exists diesel_ticks (
  week_of date primary key,
  price numeric not null,
  label text not null,
  source_label text not null,
  source_href text
);
