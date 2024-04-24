create table
  public.profiles (
    id uuid not null,
    updated_at timestamp with time zone null,
    username text null,
    full_name text null,
    avatar_url text null,
    website text null,
    screen_name text null,
    joined_at timestamp with time zone null default now(),
    join_reason text null,
    x_username character varying(15) null,
    linkedin_profile_name character varying(100) null,
    nuclear_likes text null,
    constraint profiles_pkey primary key (id),
    constraint profiles_username_key unique (username),
    constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade,
    constraint username_length check ((char_length(username) >= 3))
  ) tablespace pg_default;

create table
  public.wsy_writers (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    user_id uuid not null,
    name text null,
    karma_score integer null,
    constraint wsy_writers_pkey primary key (id)
  ) tablespace pg_default;

create table
  public.wsy_threads (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    writer_id bigint not null,
    public_key text not null,
    topic text not null,
    starting_entry_id bigint,
    constraint wsy_threads_pkey primary key (id),
    constraint wsy_threads_public_key_key unique (public_key)
  ) tablespace pg_default;

create table
  public.wsy_entries (
    id bigint generated by default as identity,
    created_at timestamp with time zone not null default now(),
    writer_id bigint not null,
    statement text not null,
    constraint wsy_entry_pkey primary key (id)
  ) tablespace pg_default;

create table
  public.wsy_thread_entries (
    thread_id bigint generated by default as identity,
    entry_id bigint not null,
    response_to_id bigint null,
    constraint wsy_thread_entries_pkey primary key (thread_id, entry_id)
  ) tablespace pg_default;