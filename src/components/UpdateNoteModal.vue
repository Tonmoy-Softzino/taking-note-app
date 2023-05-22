<template>
    <div v-if="value" class="overlay">
      <div class="modal">
        <input type="text" v-model="note.title" placeholder="Title" />
        <textarea v-model="note.description" placeholder="Description"></textarea>
        <button @click="updateNote">Confirm</button>
        <button @click="$emit('cancel')" class="close">Close</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const note = ref({});
  
  const updateNote = () => {
    if (note.value.description.trim() === '' || note.value.title.trim() === '') {
      return alert('Please fill all the fields');
    }
  
    $emit('update-note', note.value);
  };
  
  </script>
  
  <style scoped>
  /* styles here */
  </style>
  