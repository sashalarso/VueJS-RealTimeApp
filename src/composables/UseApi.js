import { ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useSupabase from "src/boot/supabase";
import { state } from "src/stores/countersState";

export default function useAPI(letter) {
  const { supabase } = useSupabase();
  const { user } = useAuthUser();

  const syncToServer = async () => {
    const counterValue = state.getVal(letter);
    const { data, error } = await supabase
      .from("counters")
      .update({ counter: counterValue })
      .match({ letter: letter });
    if (error) throw error;
  };

  async function deleteFromServer(letter) {
    const { data, error } = await supabase
      .from("counters")
      .delete()
      .match({ letter: letter });
    if (error) throw error;
  }

  async function addOnServer(letter) {
    const { data, error } = await supabase
      .from("counters")
      .insert({ counter: 0, letter: letter, user: user.value.id })
      .select();

    if (error) throw error;
  }

  const syncFromServer = async () => {
    //let counterValue = null;
    const { data, error } = await supabase
      .from("counters")
      .select("counter")
      .match({ letter: letter });
    if (error) throw error;
    if (data && data.length === 1) {
      state.setVal(letter, data[0].counter);
    }
  };

  async function shareWithUser(user_id, value) {
    const { data, error } = await supabase
      .from("counters")
      .insert({ counter: value, letter: letter, user: user_id });

    if (error) throw error;
    if (data && data.length === 1) {
      state.setVal(letter, data[0].counter);
    }
  }
  const pullShared = async () => {
    const { data, error } = await supabase
      .from("counters")
      .select()
      .match({ user: user.value.id });

    if (error) throw error;
    if (data && data.length === 1) {
      state.setVal(letter, data[0].counter);
    }
    return data;
  };

  return {
    syncFromServer,
    syncToServer,
    deleteFromServer,
    addOnServer,
    shareWithUser,
    pullShared,
  };
}
