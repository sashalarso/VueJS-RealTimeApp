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
  span.text-deep-purple-7.q-mx-sm Please enter your email to change your password
p.fixed-center
    q-input(label="email",type="email",v-model="email",data-cy="passwordInput")


    q-btn.q-ma-md(
        label="Submit",
        color="primary",
        outline, rounded,
        type="submit",
        data-cy="submit",
        @click="changePassword(email)"
      )

    q-dialog(v-model="newpass")
      q-card
        q-card-section Please check your emails !

        q-card-actions(align="right")
          q-btn(flat,label="ok",v-close-popup)


</template>
