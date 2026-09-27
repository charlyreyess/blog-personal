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

-- Mensajes del formulario de contacto
create table if not exists public.contact_messages (
  id bigint generated always as identity primary key,
  name text not null check (char_length(name) between 1 and 100),
  email text not null check (char_length(email) <= 254),
  type text not null,
  message text not null check (char_length(message) between 10 and 3000),
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

-- Cualquiera puede enviar un mensaje (solo INSERT); nadie puede leerlos con la clave pública.
-- Los lees tú desde el panel de Supabase (Table Editor).
create policy "Cualquiera puede enviar un mensaje"
  on public.contact_messages
  for insert
  to anon
  with check (true);
