<script setup>
import { defineStore } from "pinia";

import { computed, ref } from "vue";
const fname = ref("");
const lname = ref("");
// const fullname = ref('');
const handleSubmit = () => {
  const fullname = computed(() => {
    return `${fname.value} + " " + ${lname.value}`;
  });
};

// export const useCounterStore = defineStore("counter", {
//   state: () => ({ count: 0, name: "Eduardo" }),
//   getters: {
//     doubleCount: (state) => state.count * 2,
//   },
//   actions: {
//     increment() {
//       this.count++;
//     },
//   },
// });

fname.value = computed({
  get() {
    const names = fullname.value.split(" ");
    return names.length > 0 ? names[0] : "";
  },
  set(value) {
    lname.value = fullname.value.split(" ")[1];
    fullname.value = value + " " + (lname || "");
  },
});
lname.value = computed({
  get() {
    const names = fullname.value.split(" ");
    return names.length > 1 ? names[1] : "";
  },
  set(value) {
    fname.value = fullname.value.split(" ")[0];
    fullname.value = value + " " + (fname || "");
  },
});
</script>

<template>
  <form action="#" @submit.prevent="handleSubmit">
    <label for="fname"
      >Enter First Name: <input id="fname" type="text" v-model="fname"
    /></label>

    <label for="lname"
      >Enter Last Name: <input id="lname" type="text" v-model="lname"
    /></label>
    <button type="submit">Update</button>

    <di class="change-name">{{ fullname }}</di>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 5rem;
}
</style>
