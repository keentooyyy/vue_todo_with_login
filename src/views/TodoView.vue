<template>
  <div class="mt-12 grid w-11/12 bg-white place-self-center rounded-lg p-8">
    <div class="text-6xl p-12 text-center font-bold"> To Do List</div>
    <hr class="mb-3">
    <div class="grid grid-cols-1 ">
      <input class="ring-1 ring-gray-500 mb-5 p-2 rounded-lg" v-model="inputValue" type="text">
      <button @click="AddButton" class="bg-green-600 text-white px-5 py-3 w-2/6 place-self-end mb-3 rounded-lg">Add Todo</button>
    </div>
<!--    <RouterLink to="/">Go to Home</RouterLink>-->
    <div class="text-3xl my-6 font-medium">My Todo(s)</div>
    <div v-for="data in alldata" class="grid grid-cols-2 items-center">
      <p id="todo_id" class="hidden">{{ data.id }}</p>
      <p class="text-2xl" contenteditable="true" @blur="EditButton" @keydown.enter.prevent="OnEnter($event)">
        {{ data.todo_item }}</p>
      <button class="bg-red-600 text-white px-5 py-3 w-2/6 place-self-end mb-3 rounded-lg" @click="DeleteButton($event)">Delete
      </button>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import {ref} from "vue";

const url = import.meta.env.VITE_API_URL;

export default {
  data() {

    return {
      alldata: [],
      messages: [],
      inputValue: ref('')
    };
  },
  setup(){

  },
  mounted() {
    this.FetchData();
  },
  methods: {
    FetchData() {
      axios.get(url).then((res) => {
        this.alldata = res.data.data;
      })
    },
    DeleteButton(event) {

      const getParent = event.target.parentNode;
      const getID = getParent.children[0].textContent;
      getParent.remove();
      const delUrl = `${url}/${getID}`;
      axios.delete(delUrl).then(() => {

      })

    },
    AddButton(){
      // console.log(this.inputValue)
      const getInput = this.inputValue;

      const data ={
        todo_item: getInput,
      }
      axios.post(url,data).then(() => {
        this.FetchData();
      })
    },
    EditButton(event) {
      const getParent = event.target.parentNode;
      const getID = getParent.children[0].textContent;
      const getTodo = getParent.children[1].textContent;


      const editUrl = `${url}/${getID}`;

      const config = {
        headers: {
          'Content-type': 'application/json',
        }

      }
      const data = {
        todo_item: getTodo
      }
      axios.put(editUrl, data, config);
    },
    OnEnter(event) {
      event.target.blur();
    }
  }
}
</script>

<style scoped>

</style>