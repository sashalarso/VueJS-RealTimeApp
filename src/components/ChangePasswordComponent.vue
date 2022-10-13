<script setup>
import { defineComponent, defineProps } from "vue";

defineComponent({ name: "ChangePasswordComponent" });
</script>

<template lang="pug">
h6.flex.flex-center
  span.text-deep-purple-7.q-mx-sm Change password
p.flex-center
    q-input(label="email",type="email",v-model="email")
    q-input(  label="Password",v-model="new_password")
    q-btn.full-width(
        label="Change Password",
        color="primary",
        outline, rounded,
        type="submit"
      )
    p {{email}}
</template>
