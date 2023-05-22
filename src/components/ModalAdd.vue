<script setup>
import { defineEmits, ref } from 'vue';


const emit = defineEmits(["storeNote" , "closeValue"]); // defining an emit or say custom event which perform two events and can be set more

const addTitle = ref(""); // for adding the title of the note
const addNote = ref(""); //for taking the note description
const close = ref(false); //for controling the form open

// this method is for handle the form data for adding note
const storeNote = () => {
  emit('storeNote', addTitle.value, addNote.value);
  addTitle.value = "";
  addNote.value = "";
}

// this method is for close the add note modal
const closeValue = () => {
  close.value = true;
  emit('closeValue', close.value);
}
</script>

<template>
  <div class="modal" >
    <input type="text" v-model="addTitle" placeholder="Title" />
    <textarea
      name="note"
      id="note"
      cols="20"
      rows="8"
      v-model="addNote"
      placeholder="Description"
    ></textarea>
    <button @click="storeNote">Add</button>
    <button @click="closeValue" class="close">Close</button>
  </div>
</template>
<script></script>
<style scoped>
.modal {
  position: relative;
  width: 46.6rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 0.63rem;
  padding: 1.9rem;
}
.modal button {
  background-color: blueviolet;
  padding: 0.63rem 1.25rem;
  margin-top: 0.98rem;
  cursor: pointer;
  border: none;
  color: white;
  border-radius: 0.21rem;
}

.modal .close {
  background-color: rgb(235, 3, 3);
}

.modal input {
  margin-bottom: 0.3rem;
}
textarea {
  resize: none;
}
</style>
