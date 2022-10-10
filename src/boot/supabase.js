import { createClient } from "@supabase/supabase-js";
import useAuthUser from "src/composables/UseAuthUser";

const supabaseUrl = "<YOUR SUPABASE URL GOES HERE>";
const supabaseKey = "<YOUR SUPABASE KEY GOES HERE>";
const supabase = createClient(supabaseUrl, supabaseKey);

// console.log('init supabase:', supabase)
supabase.auth.onAuthStateChange((event, session) => {
  const { user } = useAuthUser();
  user.value = session?.user || null;
});

export default function useSupabase() {
  return { supabase };
}
