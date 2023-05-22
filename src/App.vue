
<script setup>
import ModalAdd from './components/ModalAdd.vue';
// import ModalUpdate from './components/ModalUpdate.vue';
import ModalUpdate from './components/ModalUpdate.vue';

import {  ref, watchEffect } from 'vue'


const showModalAdd = ref(false);
const showModalUpdate = ref(false);

const updateNote = ref('');
const updateTitle = ref('');
const update = ref(false);

const Notes = ref([]);
// watch(Notes,()=>{
//   console.log(Notes.value)
// })

// this method for store a note into a card and the data coming from the ModalAdd component which is tanken into the perameter 
const storeNote = (title, description) => {
  if(title.length<1 || description.length<1){
    return alert("Please fill all the section")
  } 
  Notes.value.push({
    id: title + Notes.value.length+1,
    title: title,
    description: description,
    delete: false,
    update: false,
    backgroundColor: getRandomColor()
  }) 
  showModalAdd.value = false;
}

// this method is for close the add modal
const closeModal= (value) => {
  console.log(value);
  if(value){
    // showModalAdd.value=false;
    showModalUpdate.value = false;
  }
}

// this method is for delete a note
const deleteNote = (note) => {
  Notes.value =  Notes.value.filter(a =>  a !== note);
}

// initialUpdateModal used for enable editing mode and get the editable card or object
const obj= ref({});
const initialUpdateModal = (note) => {
  obj.value = note;
  showModalUpdate.value = true;
  updateTitle.value = note.title;
  updateNote.value = note.description;
  update.value = true; // Set update to true
};


// addUpdateNote method is used for update the note data

const addUpdateNote = () => {
  if (updateObj.value.length < 1 || updateTitle.value.length < 1) {
    return alert("Please fill all the sections");
  }

  const updatedNote = {
  
    id: obj.value.id,
    title: updateTitle.value,
    description: updateNote.value,
    delete: false,
    backgroundColor: getRandomColor
  };

  console.log(updateNote.value);

  const index = Notes.value.findIndex((note) => note.id === updatedNote.id);

  if (index !== -1) {
    Notes.value.splice(index, 1, updatedNote);
  }

  updateNote.value = "";
  updateTitle.value = "";
  showModalUpdate.value = false;
  update.value = false;
};

// getRandomColor method is for different bakckground color for the notes

function getRandomColor() {
  return "hsl(" + Math.random() * 360 + ", 100%, 75%)";
}


// This section is for save the data on local Storage
const saveToLocalStorage = () => {
  localStorage.setItem('notes', JSON.stringify(Notes.value));
};

const loadFromLocalStorage = () => {
  const storedNotes = localStorage.getItem('notes');
  if (storedNotes) {
    Notes.value = JSON.parse(storedNotes);
  }
};

loadFromLocalStorage();

watchEffect(() => {
  saveToLocalStorage();
});

</script>

<template>
  <section>
    <div v-show="showModalAdd" class="overlay">
        <ModalAdd @store-note="storeNote" @close-value = "closeModal"/>
    </div>

    <!-- <div v-show="showModalUpdate" class="overlay">
        <ModalUpdate @update-note="addUpdateNote" @close-value = "closeModal"/>
    </div> -->


    <div class="container">
      <header>
        <h1>Notes</h1>
        <span class="material-symbols-outlined" @click="showModalAdd = !showModalAdd"> add </span>
      </header>

      <div class="card-container">
        <div class="card" v-for="note in Notes" :key="note.id" :style="{backgroundColor: note.backgroundColor}">
          <h3 class="card-title">
            {{ note.title }}
          </h3>
          <hr>
          <p class="card-description">{{ note.description }}</p>
          <div class="card-buttons">
            <button class="update" @click="initialUpdateModal(note)" >Update</button>
            <div v-show="showModalUpdate">
              <ModalUpdate/>
            </div>
            <button class="delete" @click="deleteNote(note)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>



<style scoped>
hr{
  color: white;
  margin: 1px;
}
.card h3{
  /* margin: 0; */
  height: auto;
  /* border-top: 1px solid black; */
}
.card .card-description{
  width: 100%;
  height: 80%;
  overflow:scroll;
}

section {
  height: 100vh;
  width: 100vw;
}

.container {
  max-width: 1000px;
  padding: 10px;
  margin: 0 auto;

  /* margin: 20rem; */
}
.container header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header span {
  border: 1px solid gray;
  border-radius: 100%;
  color: white;
  background: black;
  cursor: pointer;
  font-size: 2.5rem;
}
h1 {
  font-weight: bold;
  margin-bottom: 1.5rem;
  font-size: 4rem;
}

.card {
  height: 16rem;
  width: 13rem;
  padding: 0.4rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  margin-right: 1.2rem;
  margin-bottom: 1.2rem;
  background-color: rgb(100, 246, 246);
}

.overlay{
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.77);
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
}

.card-container{
    display: flex;
    flex-wrap: wrap;
}
textarea{
    resize: none;
}
.modal .close{
  background-color: rgb(235, 3, 3);
}

.modal input{
  margin-bottom: .3rem;

}
.card-buttons{
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 10%;
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




</style>
