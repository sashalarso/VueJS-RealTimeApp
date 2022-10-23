<script setup>
import { defineComponent, h, ref, onMounted, onBeforeUpdate } from "vue";
import CounterComponent from "../components/CounterComponent.vue";
import CountersTotal from "../components/CountersTotal.vue";
import useAuthUser from "src/composables/UseAuthUser";
import useApi from "src/composables/UseApi";
import useSupabase from "src/boot/supabase";
import { state } from "src/stores/countersState";

defineComponent({
  name: "IndexPage",
});

onMounted(() => {
  getAllCounters();
});
</script>

<script>
const { supabase } = useSupabase();
const add = ref(false);

const count_name = ref("");
const share = ref(true);

const { user } = useAuthUser();

export const allCounters = ref([]);
export const shareCounters = ref([]);
const getAllCounters = async () => {
  const { data } = await supabase
    .from("counters")
    .select("letter, counter")
    .match({ user: user.value.id, share: false });
  allCounters.value = data;
  if (data) {
    for (let i = 0; i < data.length; i++) {
      state.setVal(data[i].letter, data[i].counter);
    }
  }
};

async function addCounters(letter) {
  const { data } = await supabase
    .from("counters")
    .insert({ counter: 0, letter: letter, user: user.value.id })
    .select();

  getAllCounters();
}
async function deleteCounter(letter) {
  const { data } = await supabase
    .from("counters")
    .delete()
    .match({ letter: letter });

  getAllCounters();
  refreshShared();
}
async function pullShared() {
  const { data } = await supabase
    .from("counters")
    .select("letter,counter")
    .match({ user: user.value.id, share: true });
  shareCounters.value = data;
  share.value = false;
  if (data) {
    for (let i = 0; i < data.length; i++) {
      state.setVal(data[i].letter, data[i].counter);
    }
  }
}
async function refreshShared() {
  const { data } = await supabase
    .from("counters")
    .select("letter,counter")
    .match({ user: user.value.id, share: true });
  shareCounters.value = data;
}
async function hideShared() {
  shareCounters.value = [];
  share.value = true;
}
const subscript = supabase
  .from("counters")
  .on("UPDATE", (payload) => {
    state.setVal(payload.new["letter"], payload.new["counter"]);
  })
  .subscribe();
const delete_subscript = supabase
  .from("counters")
  .on("DELETE", (payload) => {
    getAllCounters();
  })
  .subscribe();
</script>

<template lang="pug">
q-page.column
  p(v-if="user").q-ma-lg.text-h6.text-purple-9.flex.flex-center Hello {{ user.user_metadata.name }}
  p(v-if="!user").q-ma-lg.text-h6.text-purple-9.flex.flex-center You are not logged in !
  p(v-if="user").q-ma-md.justify-center.flex-center



    span.row.justify-center.items-start
      q-btn.q-ma-md(@click="add = true",icon="add",no-caps,color="deep-orange-6",rounded,data-cy="btn-create") Create a new Counter
        q-tooltip(anchor="top right").bg-teal create a new counter
      q-btn(v-if="share").q-ma-md(@click="pullShared()",color="green",icon="refresh",no-caps,rounded,text-color="white") Pull Shared Counters
        q-tooltip(anchor="top right").bg-teal pull shared counters
      q-btn(v-if="!share").q-ma-md(@click="hideShared()",color="green",icon="remove",no-caps,rounded,text-color="white") Remove Shared Counters

    q-dialog(v-model="add")
      q-card
        q-card-section Enter the counter's name
        q-card-section
          q-input(dense,v-model="count_name",data-cy="counterId",@keyup.enter="add=false")
        q-card-actions(align="right")
          q-btn(flat,label="cancel",v-close-popup)
          q-btn(flat,label="add counter",v-close-popup,@click="addCounters(count_name)",data-cy="addCounter")

    p(v-for="counterss in allCounters" )
      span.row.justify-center.items-start
        span.text-h4.text-purple-9.q-my-md
        q-btn.q-ma-md(@click="deleteCounter(counterss.letter)",color="red-7",no-caps,size="0.9em",icon="delete",rounded) Delete Counter
      CounterComponent(v-bind:id="counterss.letter")
      span.row.justify-center.items-start
          span.text-h4.text-purple-9.q-my-md +

    p(v-for="counterss in shareCounters")
      span.row.justify-center.items-start
        span.text-h4.text-purple-9.q-my-md
        q-btn.q-ma-md(@click="deleteCounter(counterss.letter)",color="red-7",no-caps,size="0.9em",icon="delete",rounded) Delete a Counter
      CounterComponent(v-bind:id="counterss.letter")
        span.row.justify-center.items-start
          span.text-h4.text-purple-9.q-my-md +
    p(v-if="allCounters.length >0 || shareCounters.length")
      span.row.justify-center.items-start
          span.text-h4.text-purple-9.q-my-md =
      CountersTotal



</template>
