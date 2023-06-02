<script setup>
import { ref } from 'vue';
import ModalUpdate from './ModalUpdate.vue'

const showModalUpdate = ref(false);
const refObj = ref({});


const props = defineProps({
    noteForProps: Array,
})

const emit = defineEmits(["deleteNote"]);

const deleteNote = (note) => {
  emit("deleteNote" , note);
}
const updateMethod = (note) => {
  refObj.value = note;
}
const addUpdateNote = (updateTitle, updateNote) => {
  if (updateTitle.length < 1 || updateNote.length < 1) {
    return alert("Please fill all the sections");
  }

  const updatedNote = {
    id: refObj.value.id,
    title: updateTitle,
    description: updateNote,
    backgroundColor: refObj.backgroundColor
  };

  const index = props.noteForProps.findIndex((r) => r.id === updatedNote.id);

  if (index !== -1) {
    props.noteForProps.splice(index, 1, updatedNote);
  }

  updateNote = "";
  updateTitle = "";
  showModalUpdate.value = false;
};
</script>


<template>
  <div class="card" v-for="note in props.noteForProps" :key="note.id" >
    <h3 class="card-title">
      {{ note.title }}
    </h3>
    <hr />
    <p class="card-description">{{ note.description }}</p>
    <div class="card-buttons">
      <button class="update" @click="showModalUpdate=true , updateMethod(note)">Update</button> 
      <button class="delete" @click="deleteNote(note)">Delete</button>
    </div>
  </div>
  
  <div v-show="showModalUpdate">
      <ModalUpdate :reference-note="refObj" @closeModal="showModalUpdate=false" @update="addUpdateNote"/>
  </div>            
</template>

<style>
.container{
    display: flex;
    flex-wrap: wrap;
}
h3{
  height: auto;
}
.card {
  height: 18rem;
  width: 13.5rem;
  padding: 0.4rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  margin-right: 1.2rem;
  margin-bottom: 1.2rem;
  background-color: rgb(100, 246, 246);
}
.card-description{
  width: 100%;
  height: 80%;
  overflow:scroll;
}

.card-buttons{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10%;
  cursor: pointer;
}
.card-buttons .delete{
  border-bottom-right-radius: .9rem;
}
.card-buttons .update{
  border-bottom-left-radius: .9rem;
}
.card-buttons button{
  padding: .4rem;
  border: none;
  border-radius: .21rem;
}
hr{
  color: white;
  margin: 1px;
}
</style>
