-- Ejecuta este script en Supabase → SQL Editor.

create table if not exists public.subscribers (
  id bigint generated always as identity primary key,
  email text not null unique check (char_length(email) <= 254),
  created_at timestamptz not null default now()
);

-- Row Level Security: la anon key es pública, así que RLS es quien protege los datos.
alter table public.subscribers enable row level security;

-- Cualquiera puede suscribirse (solo INSERT)...
create policy "Cualquiera puede suscribirse"
  on public.subscribers
  for insert
  to anon
  with check (true);

-- ...pero no existe ninguna política SELECT/UPDATE/DELETE para anon,
-- así que nadie puede leer ni modificar la lista con la clave pública.
