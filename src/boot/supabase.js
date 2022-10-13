import { createClient } from "@supabase/supabase-js";
import useAuthUser from "src/composables/UseAuthUser";

const supabaseUrl = "https://zehidrkvjcfwvyqotkda.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InplaGlkcmt2amNmd3Z5cW90a2RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjU0NzgwODUsImV4cCI6MTk4MTA1NDA4NX0.b6Zv5-eIMHE-S9liGaapffYLHVN1qL9vBloYS8_O5Vs";
const supabase = createClient(supabaseUrl, supabaseKey);

// console.log('init supabase:', supabase)
supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();
  user.value = session?.user || null;
});

export default function useSupabase() {
  return { supabase };
}
