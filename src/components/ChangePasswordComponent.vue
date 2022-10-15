<script setup>
import { defineComponent, defineProps, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";

defineComponent({ name: "ChangePasswordComponent" });
const email = ref("");
const new_password = ref("");
const { changePassword } = useAuthUser();
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
        @click="changePassword({email})"
      )
    p {{email}}
</template>
