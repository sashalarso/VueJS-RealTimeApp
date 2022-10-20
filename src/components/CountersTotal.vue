<script setup>
import { defineComponent, computed } from "vue";
import { state } from "../stores/countersState";
import { allCounters, shareCounters } from "src/pages/IndexPage.vue";
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
function somme() {
  let a = 0;
  console.log(allCounters.value[0].letter);
  for (let i = 0; i < allCounters.value.length; i++) {
    a += state.getVal(allCounters.value[i].letter);
    console.log(a);
  }
  return a;
}
function share() {
  let a = 0;
  console.log(shareCounters.value);
  if (shareCounters.value.length > 0) {
    for (let i = 0; i < shareCounters.value.length; i++) {
      a += state.getVal(shareCounters.value[i].letter);
      console.log(a);
    }
  }
  return a;
}
let total = computed(() => somme() + share());
</script>

<template lang="pug">
.column.flex.flex-center
  p.q-ma-md.text-h5.text-purple-9 Total
  p.q-my-md.q-mx-xl.text-h5.text-cyan {{ total }}
</template>
