<template>
    <section>
      <AddNoteModal v-model="showModalAdd" @add-note="addNote" />
      <UpdateNoteModal
        v-if="showModalUpdate"
        :note="selectedNote"
        @update-note="updateNote"
        @cancel="showModalUpdate = false"
      />
  
      <div class="container">
        <header>
          <h1>Notes</h1>
          <span class="material-symbols-outlined" @click="showModalAdd = true">add</span>
        </header>
  
        <div class="card-container">
          <NoteCard
            v-for="note in notes"
            :key="note.id"
            :note="note"
            @edit-note="editNote"
            @delete-note="deleteNote"
          />
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import AddNoteModal from './components/AddNoteModal.vue';
  import UpdateNoteModal from './components/UpdateNoteModal.vue';
  import NoteCard from './components/NoteCard.vue';
  
  const showModalAdd = ref(false);
  const showModalUpdate = ref(false);
  const notes = ref([]);
  
  const addNote = (note) => {
    notes.value.push(note);
  };
  
  const editNote = (note) => {
    selectedNote.value = note;
    showModalUpdate.value = true;
  };
  
  const updateNote = (updatedNote) => {
    const index = notes.value.findIndex((note) => note.id === updatedNote.id);
  
    if (index !== -1) {
      notes.value.splice(index, 1, updatedNote);
    }
  
    showModalUpdate.value = false;
  };
  
  const deleteNote = (note) => {
    notes.value = notes.value.filter((n) => n !== note);
  };
  
  </script>
  
  <style scoped>
  /* styles here */
  </style>
  