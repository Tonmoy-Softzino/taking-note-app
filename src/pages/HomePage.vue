
<script setup>
//             -----------All imports are here-------------
import CardTemplate from '../components/CardTemplate.vue';
import ModalAdd from '../components/ModalAdd.vue';

import {  ref, watchEffect } from 'vue';
//             ----------All imports ends here-------------



//              -------------reactive elements decclared here--------------
const showModalAdd = ref(false);
const Notes = ref([{
  id: "13219439",
  title: "Vue learn very deeply",
  description:"this is starting of vue js and many things to be done",
  backgroundColor: getRandomColor()
}]);
//                ------------reactive elements declaration end here-----------




//              ----------All methods for ModalAdd component---------------
const storeNote = (title, description) => {
  if(title.length<1 || description.length<1){
    return alert("Please fill all the section")
  } 
  Notes.value.push({
    id: title + Notes.value.length+1,
    title: title,
    description: description,
    backgroundColor: getRandomColor()
  }) 
  showModalAdd.value = false;
}

// this method is for close the add modal
const closeModal= (value) => {
  console.log(value);
  if(value){
    showModalAdd.value=false;
  }
}
//             -----------Methods for ModalAdd component ends here-------------



// this method is for delete a note
const deleteNote = (note) => {
  Notes.value =  Notes.value.filter(a =>  a !== note);
}


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
        <ModalAdd @storeNote="storeNote" @closeValue = "closeModal"/>
    </div>

    <div class="container">
      <header>
        <h1>Notes</h1>
        <span class="material-symbols-outlined" @click="showModalAdd = !showModalAdd"> add </span>
      </header>

      <div class="card-container">
        <!-- <div class="card" v-for="note in Notes" :key="note.id" :style="{backgroundColor: note.backgroundColor}"> -->
          <CardTemplate @delete-note="deleteNote" :noteForProps="Notes"/>
        <!-- </div> -->
      </div>
    </div> 
  </section>
</template>



<style scoped>
section {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
}
.container {
  max-width: 1000px;
  width: 90%;
  padding: 10px;
  margin: 0 auto;
}
.container header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
header span {
  border: 1px solid gray;
  border-radius: 100%;
  color: white;
  background: black;
  cursor: pointer;
  font-size: 2.5rem;
  display: flex;
  align-items: center;
  margin-top: 2.5rem;
  /* padding-top: 2rem; */
}
h1 {
  font-weight: bold;
  margin-bottom: 1.5rem;
  font-size: 4rem;
  text-align: center;
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
</style>
