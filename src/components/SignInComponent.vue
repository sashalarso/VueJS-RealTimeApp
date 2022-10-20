<script setup>
import { defineComponent, onMounted, reactive } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import { useRouter } from "vue-router";
import InputEmailComponent from "src/components/InputEmailComponent.vue";
import InputPasswordComponent from "src/components/InputPasswordComponent.vue";

defineComponent({ name: "SignInComponent" });

const router = useRouter();
const { signIn, user } = useAuthUser();
const { notifyError, notifySuccess } = useNotify();
const form = reactive({ email: "", password: "" });

const handleSignIn = async () => {
  try {
    user.value = await signIn(form);
    // ({ email, password } = form.value)
    notifySuccess(`Successful sign in as ${user.value.email}!`);
    router.push({
      name: "home",
      //params: { email: form.email }
    });
  } catch (error) {
    notifyError(error.message);
  }
};
const redirectPassword = async () => {
  router.push({
    name: "changePasswordPage",
  });
};
</script>

<template lang="pug">
q-form.row.justify-center(@submit.prevent="handleSignIn")
  .col-md-4.col-sm-6.col-xs-10.q-gutter-y-md
    InputEmailComponent(v-model="form.email")
    InputPasswordComponent(v-model="form.password")
    .full-width.q-pt-md
      q-btn.full-width(
        label="Sign In",
        color="primary",
        outline, rounded,
        type="submit",
        data-cy="signIn"
        )
span.row.justify-center
  q-btn(
    label="Password forget ?",
    color="primary",
    outline, rounded,
    type="submit",
    @click="redirectPassword"
  )
</template>
