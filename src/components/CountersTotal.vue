<script setup>
import { defineComponent, computed } from "vue";
import { state } from "../stores/countersState";
import { allCounters, shareCounters } from "src/pages/IndexPage.vue";
defineComponent({ name: "CountersTotal" });

function somme() {
  let a = 0;

  for (let i = 0; i < allCounters.value.length; i++) {
    a += state.getVal(allCounters.value[i].letter);
  }
  return a;
}
function share() {
  let a = 0;

  if (shareCounters.value.length > 0) {
    for (let i = 0; i < shareCounters.value.length; i++) {
      a += state.getVal(shareCounters.value[i].letter);
    }
  }
  return a;
}
let total = computed(() => somme() + share());
</script>

<template lang="pug">
.column.flex.flex-center
  p.q-ma-md.text-h5.text-purple-9 Total
  p.q-my-md.q-mx-xl.text-h5.text-cyan(data-cy="total") {{ total }}
</template>
