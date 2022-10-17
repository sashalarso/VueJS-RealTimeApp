<script setup>
import { defineComponent, h, ref, onMounted, onBeforeUpdate } from "vue";
import CounterComponent from "../components/CounterComponent.vue";
import CountersTotal from "../components/CountersTotal.vue";
import useAuthUser from "src/composables/UseAuthUser";
import useApi from "src/composables/UseApi";
import useSupabase from "src/boot/supabase";

defineComponent({
  name: "IndexPage",
});
const { supabase } = useSupabase();
const add = ref(false);
const delete_ = ref(false);
const count_name = ref("");
const share = ref(true);
const visible = ref([]);

const { user } = useAuthUser();

const allCounters = ref([]);
const shareCounters = ref([]);
const getAllCounters = async () => {
  const { data } = await supabase
    .from("counters")
    .select("letter, counter")
    .match({ user: user.value.id, share: false });
  allCounters.value = data;
  console.log(allCounters.value);
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
}
async function pullShared() {
  const { data } = await supabase
    .from("counters")
    .select("letter,counter")
    .match({ user: user.value.id, share: true });
  shareCounters.value = data;
  share.value = false;
}
async function hideShared() {
  shareCounters.value = [];
  share.value = true;
}

onMounted(() => {
  getAllCounters();
});
</script>

<script>
const { supabase } = useSupabase();
const { user } = useAuthUser();
export var counters = [];
export var letters = [];
const allCounters = ref([]);

export const getAllCounters = async () => {
  const { data } = await supabase
    .from("counters")
    .select("letter, counter")
    .match({ user: user.value.id });
  allCounters.value = data;
  console.log(allCounters.value);
};
</script>

<template lang="pug">
q-page.column
  p(v-if="user").q-ma-lg.text-h6.text-purple-9.flex.flex-center Hello {{ user.user_metadata.name }}
  p(v-if="!user").q-ma-lg.text-h6.text-purple-9.flex.flex-center You are not logged in !
  p(v-if="user").q-ma-md.justify-center.flex-center



    span.row.justify-center.items-start
      q-btn.q-ma-md(@click="add = true",icon="add",no-caps,color="deep-orange-6",rounded) Create a new Counter
      q-btn(v-if="share").q-ma-md(@click="pullShared()",color="green",icon="refresh",no-caps,rounded,text-color="white") Pull Shared Counters
      q-btn(v-if="!share").q-ma-md(@click="hideShared()",color="green",icon="remove",no-caps,rounded,text-color="white") Remove Shared Counters
      q-btn.q-ma-md(@click="delete_ =true",color="red-7",no-caps,size="0.9em",icon="delete") Delete a Counter
    q-dialog(v-model="delete_")
      q-card
        q-card-section Enter the counter's name you want to delete
        q-card-section
          q-input(dense,v-model="count_name",@keyup.enter="add=false")
        q-card-actions(align="right")
          q-btn(flat,label="cancel",v-close-popup)
          q-btn(flat,label="delete counter",v-close-popup,@click="deleteCounter(count_name)")
    q-dialog(v-model="add")
      q-card
        q-card-section Enter the counter's name
        q-card-section
          q-input(dense,v-model="count_name",@keyup.enter="add=false")
        q-card-actions(align="right")
          q-btn(flat,label="cancel",v-close-popup)
          q-btn(flat,label="add counter",v-close-popup,@click="addCounters(count_name)")

    p(v-for="counterss in allCounters" )
      CounterComponent(v-bind:id="counterss.letter")
      span.row.justify-center.items-start
          span.text-h4.text-purple-9.q-my-md +

    p(v-for="counterss in shareCounters")
      CounterComponent(v-bind:id="counterss.letter")
        span.row.justify-center.items-start
          span.text-h4.text-purple-9.q-my-md +
    p(v-if="allCounters.length >0 || shareCounters.length")
      span.row.justify-center.items-start
          span.text-h4.text-purple-9.q-my-md =
      CountersTotal



</template>
