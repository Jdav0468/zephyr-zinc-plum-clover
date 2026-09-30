create table if not exists daily_jokes (
  joke_date date primary key,
  setup text not null,
  punchline text not null
);
