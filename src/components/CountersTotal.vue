<script setup>
import { defineComponent, computed } from "vue";
import { state } from "../stores/countersState";
import { counters, letters } from "../pages/IndexPage.vue";

defineComponent({ name: "CountersTotal" });
let alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

let total = computed(
  () =>
    state.getVal("A") +
    state.getVal("B") +
    state.getVal("C") +
    state.getVal("Z")
);
</script>

<template lang="pug">
.column.flex.flex-center
  p.q-ma-md.text-h5.text-purple-9 Total
  p.q-my-md.q-mx-xl.text-h5.text-cyan {{ total }}
</template>
