<template>
    <div class="card" :style="{ backgroundColor: note.backgroundColor }">
      <h3 class="card-title">{{ note.title }}</h3>
      <hr />
      <p class="card-description">{{ note.description }}</p>
      <div class="card-buttons">
        <button class="update" @click="$emit('edit-note', note)">Update</button>
        <button class="delete" @click="$emit('delete-note', note)">Delete</button>
      </div>
    </div>
  </template>
  
  <script setup>
  const props = defineProps({
    note: {
      type: Object,
      required: true,
    },
  });
  
  </script>
  
  <style scoped>
  /* styles here */
  </style>
  