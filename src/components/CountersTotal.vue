<script setup>
import { defineComponent, computed } from "vue";
import { state } from "../stores/countersState";
import { counters } from "../pages/IndexPage.vue";

defineComponent({ name: "CountersTotal" });
let a = 0;
function getotal() {
  a = 0;
  counters.forEach((counter) => (a += state.getVal(counter)));

  return a;
}
let total = computed(() => getotal());
//state.getVal("A") + state.getVal("B") + state.getVal("C")
</script>

<template lang="pug">
.column.flex.flex-center
  p.q-ma-md.text-h5.text-purple-9 Total
  p.q-my-md.q-mx-xl.text-h5.text-cyan {{ total }}
</template>
