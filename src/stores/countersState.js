import { h, reactive } from "vue";
import { LocalStorage } from "quasar";
import { counters } from "../pages/IndexPage.vue";

export const state = reactive({
  counterA: 0,
  counterB: 0,
  counterC: 0,
  counterD: 0,
  counterE: 0,
  counterF: 0,
  counterG: 0,
  counterH: 0,
  counterI: 0,
  counterJ: 0,
  counterK: 0,
  counterL: 0,
  counterM: 0,
  counterN: 0,
  counterO: 0,
  counterP: 0,
  counterQ: 0,
  counterR: 0,
  counterS: 0,
  counterT: 0,
  counterU: 0,
  counterV: 0,
  counterW: 0,
  counterX: 0,
  counterY: 0,
  counterZ: 0,
  alphabet: [
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
  ],

  getVal(id) {
    for (const letter of this.alphabet) {
      if (id == letter) {
        var a = eval("this.counter" + letter + ";");

        return a;
      }
    }
    if (id === "A") {
      console.log("test");
      return this.counterA;
    } else if (id === "B") {
      return this.counterB;
    } else if (id === "C") {
      return this.counterC;
    } else {
      console.log("Attempting to get a non-existing counter");
      return 0;
    }
  },

  setVal(id, value) {
    if (id === "A") {
      this.counterA = value;
      return this.counterA;
    } else if (id === "B") {
      this.counterB = value;
      console.log(this.counterB);
      return this.counterB;
    } else if (id === "C") {
      this.counterC = value;
      return this.counterC;
    } else {
      console.log("Attempting to set a non-existing counter");
      return 0;
    }
  },

  incr(id) {
    this.alphabet.forEach((i) => {
      if (id == i) {
        eval("this.counter" + i + "++;");
      }
    });
  },

  decr(id) {
    this.alphabet.forEach((i) => {
      if (id == i) {
        eval("this.counter" + i + "--;");
      }
    });
  },

  reset(id) {
    this.alphabet.forEach((i) => {
      if (id == i) {
        eval("this.counter" + i + "=0;");
      }
    });
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
