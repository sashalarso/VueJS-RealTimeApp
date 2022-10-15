import { h, reactive } from "vue";
import { LocalStorage } from "quasar";
import { counters } from "../pages/IndexPage.vue";

export const state = reactive({
  counterA: 0,
  counterB: 0,
  counterC: 0,

  getVal(id) {
    if (id === "A") {
      return this.counterA;
    } else if (id === "B") {
      return this.counterB;
    } else if (id === "C") {
      return this.counterC;
    } else {
      console.log("Attempting to get a non-existing counter");
      return 0;

      return 0;
    }
  },

  setVal(id, value) {
    if (id === "A") {
      this.counterA = value;
      return this.counterA;
    } else if (id === "B") {
      this.counterB = value;
      return this.counterB;
    } else {
      console.log("Attempting to set a non-existing counter");
      return 0;
    }
  },

  incr(id) {
    if (id === "A") {
      this.counterA++;
    } else if (id === "B") {
      this.counterB++;
    } else if (id === "C") {
      this.counterC++;
    } else console.log("Attempting to increment a non-existing counter");
  },

  decr(id) {
    if (id === "A") {
      this.counterA--;
    } else if (id === "B") {
      this.counterB--;
    } else console.log("Attempting to decrement a non-existing counter");
  },
  reset(id) {
    if (id === "A") {
      this.counterA = 0;
    } else if (id === "B") {
      this.counterB = 0;
    }
  },
  save(id) {
    if (id === "A") {
      LocalStorage.set("A_value", this.counterA);
      console.log(LocalStorage.getItem("A_value"));
    } else if (id === "B") {
      LocalStorage.set("B_value", this.counterB);
      console.log(LocalStorage.getItem("B_value"));
    }
  },
  sync(id) {
    if (id === "A") {
      this.counterA = parseInt(LocalStorage.getItem("A_value"));
    } else if (id === "B") {
      this.counterB = parseInt(LocalStorage.getItem("B_value"));
    }
  },
});
