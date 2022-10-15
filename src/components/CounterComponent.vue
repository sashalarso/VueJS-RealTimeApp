<script setup>
import { defineComponent, ref, render, toRef } from "vue";
import { state } from "../stores/countersState";
import useAuthUser from "src/composables/UseAuthUser";
import useAPI from "src/composables/UseApi";
import { counters } from "../pages/IndexPage.vue";
import { deletecounter } from "../pages/IndexPage.vue";
defineComponent({ name: "CounterComponent" });

const { isSignedIn } = useAuthUser();

const props = defineProps({
  id: {
    required: true,
    validator(value) {
      return counters.includes(value);
    },
  },
});

const { syncFromServer, syncToServer, deleteFromServer, shareWithUser } =
  useAPI(props.id);

const counterValue = toRef(state, "counter" + props.id);
const share = ref(false);
const user_id = ref("");
</script>

<template lang="pug">
.column.justify-evenly
  .row.justify-center.items-end
    p.q-ma-md.text-h5.self-center Counter {{ id }}
    q-btn.q-ma-xs(
          rounded,
          color="red-7",
          no-caps,
          size="0.9em",
          icon="delete",
          label="Delete counter",
          @click="deletecounter(props.id),deleteFromServer"
          )
  .row.justify-center.items-end
    q-btn.q-ma-md.col-1(rounded, color="cyan", @click="state.incr(id)")
      q-tooltip(anchor="top left").bg-teal increment
      q-icon(name="arrow_drop_up", size="md")
    q-input.col-8(
      v-model.number="counterValue",
      placeholder="Enter number",
      error-message = "Input must be a number",
      outlined,
      dense,
      rounded,
      input-class=" text-h5 text-center text-cyan",
      :rules="[val => (Number.isFinite(val)) || 'error']"
      )
      q-tooltip(anchor="bottom middle").bg-teal Enter number
    q-btn.q-ma-md.col-1(rounded, color="cyan", @click="state.decr(id)")
      q-tooltip(anchor="top right").bg-teal decrement
      q-icon(name="arrow_drop_down", size="md")
  .row.justify-center
    .column.col-4
      q-btn.q-ma-xs.bg-teal-13(
        rounded,
        :disabled="!isSignedIn",
        dense,
        no-caps,
        size="0.9em",
        icon="cloud_upload",
        label="Sync to Server",
        @click = "syncToServer"
        )
        q-tooltip(anchor="bottom left").bg-teal update server values
    .column.col-5
      q-btn.q-ma-xs.bg-teal-13(
        rounded,
        :disabled="!isSignedIn",
        dense,
        no-caps,
        size="0.9em",
        icon="cloud_download",
        label="Sync from Server",
        @click = "syncFromServer"
        )
        q-tooltip(anchor="bottom right").bg-teal update local values from server
    .column.col-5
      q-btn.q-ma-xs.bg-teal-13(rounded, color= "green",@click="state.reset(id)",data-cy="btn-reset") Reset
        q-tooltip( data-cy="lt-rst" anchor="top right").bg-teal reset value
      q-btn.q-ma-xs.bg-teal-13(rounded,icon="save", color= "deep-orange-6", @click="state.save(id)", data-cy="btn-save",no-caps) Save Store as Local
        q-tooltip(anchor="top right").bg-teal save value
      q-btn.q-ma-xs.bg-teal-13(rounded,icon="upload", color= "deep-orange-6",@click="state.sync(id)",data-cy="btn-sync",no-caps) Sync Store from Local
        q-tooltip(anchor="top right").bg-teal recup value
      q-btn.q-ma-xs.bg-teal-13(rounded,icon="share", color= "deep-orange-6",@click="share= true",data-cy="btn-sync",no-caps) Share counter
      q-dialog(v-model="share")
        q-card
          q-card-section Enter the id of the user you want to share with
          q-card-section
            q-input(dense,v-model="user_id",@keyup.enter="share=false")
          q-card-actions(align="right")
            q-btn(flat,label="cancel",v-close-popup)
            q-btn(flat,label="share with user",v-close-popup,@click="shareWithUser(user_id)")




</template>
