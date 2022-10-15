<script setup>
import { defineComponent, h, ref } from "vue";
import CounterComponent from "../components/CounterComponent.vue";
import CountersTotal from "../components/CountersTotal.vue";
import useAuthUser from "src/composables/UseAuthUser";
import useApi from "src/composables/UseApi";

defineComponent({
  name: "IndexPage",
});

const add = ref(false);
const count_name = ref("");
const share = ref(true);

let countersShared = [];
let letters = [];

const { pullShared, addOnServer } = useApi();

function addCounter() {
  counters.push(count_name.value);
  console.log(counters);
}
function pullSharedOn() {
  pullShared().then((data) => (countersShared = data));

  countersShared.forEach((counter) => letters.push(counter.letter));

  share.value = false;
  console.log(letters);
}

const { user } = useAuthUser();
</script>

<script>
export var counters = [];
export var letters = [];

export function deletecounter(id) {
  const index = counters.indexOf(id);
  counters.splice(index, 1);
  console.log(counters);
}
</script>

<template lang="pug">
q-page.column
  p(v-if="user").q-ma-lg.text-h6.text-purple-9.flex.flex-center Hello {{ user.user_metadata.name }}
  p(v-if="!user").q-ma-lg.text-h6.text-purple-9.flex.flex-center You are not logged in !
  p(v-if="user").q-ma-md.justify-center.flex-center



    span.row.justify-center.items-start
      q-btn.q-ma-md(@click="add = true",icon="add",no-caps,color="deep-orange-6",rounded) Create a new Counter
      q-btn(v-if="share").q-ma-md(@click="pullSharedOn()",color="green",icon="refresh",no-caps,rounded,text-color="white") Pull Shared Counters
      q-btn(v-if="!share").q-ma-md(@click="share=true",color="green",icon="remove",no-caps,rounded,text-color="white") Remove Shared Counters
    q-dialog(v-model="add")
      q-card
        q-card-section Enter the counter's name
        q-card-section
          q-input(dense,v-model="count_name",@keyup.enter="add=false")
        q-card-actions(align="right")
          q-btn(flat,label="cancel",v-close-popup)
          q-btn(flat,label="add counter",v-close-popup,@click="addCounter(),addOnServer(count_name)")
    p(v-for="counter in counters")
      CounterComponent(v-bind:id="counter")

      span.row.justify-center.items-start
        span.text-h4.text-purple-9.q-my-md +
    p(v-if="!share")
      p(v-for="counter in letters")
        CounterComponent(v-bind:id="counter")

        span.row.justify-center.items-start
          span.text-h4.text-purple-9.q-my-md +
    span(v-if="counters.length >0").row.justify-center.items-start
      span.text-h4.text-purple-9.q-my-md   =
    p(v-if="counters.length || letters.length >0")
      CountersTotal





</template>
