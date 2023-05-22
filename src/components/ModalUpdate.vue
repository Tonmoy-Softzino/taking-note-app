<script setup>
import { defineEmits, ref, defineProps } from "vue";

const props = defineProps({
  note: Object,
});


const updateNote = ref(props.note.note); //updating the note value
const updateTitle = ref(props.note.titl); //for updating the title
const update = ref(false); //It is like a switch for enable the update phase
const close = ref(true); //for controling the form open

const emit = defineEmits(["updateNoteValue", "closeUpdateMoadl"]); // defining an emit or say custom event which perform two events and can be set more

// this method is for handle the form data for adding note
const updateNoteValue = () => {
  emit("updateNoteValue", updateTitle.value, updateNote.value);
};

// this method is for close the add note modal
const closeUpdateForm = () => {
  close.value = true;
  emit("closeValue", close.value);
  console.log(close.value);
};
</script>

<template>

<!-- <button class="update" @click="close = false">Update</button> -->
  <div class="modal-mask" v-show="!close">
    <div class="modal-container">
      <div class="modal">
        <input type="text" v-model="updateTitle" placeholder="Title" />
        <textarea
          name="note"
          id="note"
          cols="20"
          rows="8"
          v-model="updateNote"
          placeholder="Description"
        ></textarea>
        <button @click="updateNoteValue">Confirm</button>
        <button @click="closeUpdateForm" class="close">Close</button>
      </div>
    </div>
  </div>
</template>
<script></script>
<style scoped>
.modal-mask {
  position: fixed;
  inset: 0;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.3);
}
.modal-container {
  background-color: white;
  width: 80%;
  max-width: 700px;
  padding: 1rem;
  border-radius: 10px;
}
.modal {
  position: relative;
  /* width: 46.6rem; */
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
