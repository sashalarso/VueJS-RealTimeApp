<script setup>
import { defineComponent, h, ref } from "vue";
import CounterComponent from "../components/CounterComponent.vue";
import CountersTotal from "../components/CountersTotal.vue";
import useAuthUser from "src/composables/UseAuthUser";

defineComponent({
  name: "IndexPage",
});

const add = ref(false);
const count_name = ref("");

const { user } = useAuthUser();
</script>

<template lang="pug">
q-page.column
  p(v-if="user").q-ma-lg.text-h6.text-purple-9.flex.flex-center Hello {{ user.user_metadata.name }}
  p(v-if="!user").q-ma-lg.text-h6.text-purple-9.flex.flex-center You are not logged in !
  p(v-if="user").q-ma-lg
    .row.justify-center.items-start.q-my-xl
      span.row.flex.flex-center
        CounterComponent(id="A")
      span.row.justify-center.items-start
        span.text-h4.text-purple-9.q-my-md +
        CounterComponent(id="B")
      span.row.justify-center.items-start
        span.text-h4.text-purple-9.q-my-md   =
        CountersTotal

    q-btn.q-ma-md(@click="add = true",icon="add",no-caps,color="deep-orange-6",rounded) Create a new Counter
    q-btn.q-ma-md(@click="",color="green",icon="refresh",no-caps,text-color="white") Pulled Shared Counters
    q-dialog(v-model="add")
      q-card
        q-card-section Enter the counter's name
        q-card-section
          q-input(dense,v-model="count_name",@keyup.enter="add=false")
        q-card-actions(align="right")
          q-btn(flat,label="cancel",v-close-popup,@click="")
          q-btn(flat,label="add counter",v-close-popup)



</template>
