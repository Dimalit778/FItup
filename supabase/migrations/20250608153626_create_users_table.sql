-- Create a table for users
create table if not exists public.users (
    id uuid primary key,
    email varchar,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
    metadata jsonb default '{}'::jsonb
);

-- Enable Row Level Security (RLS)
alter table public.users enable row level security;

-- Create policies
create policy "Users can view their own data" on public.users
    for select using (auth.uid() = id);

create policy "Service role can manage all users" on public.users
    using (auth.role() = 'service_role');

-- Create an index on email for faster lookups
create index users_email_idx on public.users (email);

-- Create updated_at trigger
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger users_updated_at
    before update on public.users
    for each row
    execute procedure public.handle_updated_at();
