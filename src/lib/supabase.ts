import { createClient } from "@supabase/supabase-js";

// Cliente con la clave pública (anon). Los permisos reales los decide RLS en Supabase.
// Devuelve null si las variables de entorno no están configuradas.
export function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey, { auth: { persistSession: false } });
}
