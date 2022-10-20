<script setup>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter, useRoute } from "vue-router";

defineComponent({ name: "UpdatePasswordPage" });
const password_1 = ref("");
const password_2 = ref("");
const { updatePassword, signOut } = useAuthUser();
const route = useRoute();
const router = useRouter();
const token = route.query.token;
const handleUpdatePassword = async () => {
  if (password_1.value == password_2.value && password_1.value.length > 5) {
    await updatePassword(token, password_1.value);
    alert("Password changed !");
    await signOut();
    router.push({ name: "signInPage" });
  }
};
</script>

<template lang="pug">
q-page

  q-input.q-ma-xl(label="Please enter your new password",type="password",v-model="password_1")
  p(v-if="password_1.length<6",color="red-1").text-center.q-ma-lg
    span
      q-icon(name="warning",color="red",size="30px")
      h5 Password minimal length must be 6 !
  q-input.q-ma-xl(label="Confirm the new password",type="password",v-model="password_2")
  p(v-if="password_1 != password_2").text-center.q-ma-lg
    q-icon(name="warning",color="red",size="30px")
    h5 Confirm password must be equal your new password !
  div.relative-position
    q-btn.q-ma-lg.absolute-center(
        label="Change Password",
        color="primary",
        outline, rounded,
        type="submit",
        @click="handleUpdatePassword()"
      )
</template>
