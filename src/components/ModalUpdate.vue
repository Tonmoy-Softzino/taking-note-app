<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  referenceNote: Object,
})
const updateNote = ref(props.referenceNote.description); //updating the note value
const updateTitle = ref(props.referenceNote.title); //for updating the title
const close = ref(true); //for controling the form open

watch(() => props.referenceNote, (newValue) => {
  updateNote.value = newValue.description;
  updateTitle.value = newValue.title;
});

const emit = defineEmits(["update", "closeModal"]); // defining an emit or say custom event which perform two events and can be set more


// this method is for handle the form data for adding note
const updateNoteValue = () => {
  emit("update", updateTitle.value, updateNote.value);
};

// this method is for close the add note modal
const closeUpdateForm = () => {
  emit("closeModal", close.value);
  updateNote.value = props.referenceNote.description;
  updateTitle.value = props.referenceNote.title;
};
</script>

<template>
  <!-- <button class="update" @click="close = false">Update</button> -->
  <div class="modal-mask">
    <div class="modal-container">
      <div class="modal">
        <input type="text" placeholder="Title" v-model="updateTitle"/>
        <textarea name="note" id="note" cols="20" rows="8" v-model="updateNote" placeholder="Description"></textarea>
        <button @click="updateNoteValue" >Confirm</button>
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
  background-color: rgba(116, 80, 80, 0.3);
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
