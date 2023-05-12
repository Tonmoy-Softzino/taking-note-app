<script setup>
import { ref,computed } from 'vue';

const myList = ref([
  {id: 1, title: "peractise slot", complate : false},
  {id: 2, title: "peractise register", complate : false},
  {id: 3, title: "peractise props", complate : false},
  {id: 4, title: "peractise event", complate : false},
  {id: 5, title: "peractise Composition api", complate : false}
])

const newList = ref('');

const complateList = computed(() => {
  return myList.value.filter((a) => a.complate);
})
const InprogressList = computed(() => {
  return myList.value.filter((a) => !a.complate);
})

const addListFun = () => {
  myList.value.push({
    id: myList.value.length+1,
    title: newList.value,
    complate: false,
  });
  newList.value = '';
}

</script>

<template>
  <section>
    <div class="inprogress" v-show="InprogressList.length">
      <h2>Inprogress</h2>
      <ul>
        <li v-for="item in InprogressList" :key="item.id">
          <label>
            {{ item.title  }}
            <input v-model="item.complate" type="checkbox" >            
          </label>
        </li>
      </ul>
    </div>
    <div>
      <input type="text" v-model="newList">
      <button @click="addListFun">Add list</button>
    </div>
    <div class="complate" v-show="complateList.length">
      <h2>Complate</h2>
      <ul>
        <li v-for="list in complateList " :key = "list.id">
          <label>
            {{ list.title  }}
            <input v-model="list.complate" type="checkbox" >            
          </label>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
  section{
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .complate{
    margin-top: 2rem;
  }
  .complate, .inprogress{
    border: 1px solid gray;
    padding: 2rem;
  }
</style>
  

<!-- find the bug and solve this from foysal vai -->