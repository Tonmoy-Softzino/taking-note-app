<template>
    <div v-if="value" class="overlay">
      <div class="modal">
        <input type="text" v-model="title" placeholder="Title" />
        <textarea v-model="description" placeholder="Description"></textarea>
        <button @click="addNote">Add</button>
        <button @click="$emit('update:value', false)" class="close">Close</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const title = ref('');
  const description = ref('');
  
  const addNote = () => {
    if (title.value.trim() === '' || description.value.trim() === '') {
      return alert('Please fill all the fields');
    }
  
    const note = {
      id: generateId(),
      title: title.value,
      description: description.value,
      delete: false,
      update: false,
      backgroundColor: getRandomColor(),
    };
  
    $emit('add-note', note);
  
    title.value = '';
    description.value = '';
  };
  
  const generateId = () => {
    return Math.random()*100000000;
  };
  
  const getRandomColor = () => {
    return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
  };
  
  </script>
  
  <style scoped>
  /* styles here */
  </style>
  