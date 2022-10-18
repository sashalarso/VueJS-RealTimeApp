<script setup>
import { defineComponent, defineProps, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useSupabase from "src/boot/supabase";

defineComponent({ name: "ChangePasswordComponent" });
const { supabase } = useSupabase();
const email = ref("");
const newpass = ref(false);

async function changePassword(email) {
  const res = await supabase.auth.api.resetPasswordForEmail(email);
  newpass.value = true;
}
</script>

<template lang="pug">
h6.flex.flex-center
  span.text-deep-purple-7.q-mx-sm Change password
p.flex-center
    q-input(label="email",type="email",v-model="email")


    q-btn.full-width(
        label="Change Password",
        color="primary",
        outline, rounded,
        type="submit",
        @click="changePassword(email)"
      )

    q-dialog(v-model="newpass")
      q-card
        q-card-section Please check your emails !

        q-card-actions(align="right")
          q-btn(flat,label="ok",v-close-popup)


</template>
