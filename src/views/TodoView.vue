<template>
  <div class="mt-12 grid w-11/12 bg-white place-self-center rounded-lg p-8">
    <div class="text-6xl p-12 text-center font-bold"> To Do List</div>
    <hr class="mb-6">
    <div class="grid grid-cols-1 ">
      <input class="ring-1 ring-gray-500 mb-5 p-2 rounded-lg" type="text" @keydown.enter.prevent="ClickAdd($event)">
      <button @click="AddButton($event)" class="bg-green-600 text-white px-5 py-3 place-self-start mb-3 rounded-lg">Add Todo</button>
    </div>
<!--    <RouterLink to="/">Go to Home</RouterLink>-->
    <div class="text-3xl my-6 font-medium">My Todo(s)</div>
    <div v-for="data in alldata" class="grid grid-cols-2 items-center">
      <p id="todo_id" class="hidden">{{ data.id }}</p>
      <p class="text-2xl outline-none" contenteditable="true" @blur="EditButton" @keydown.enter.prevent="OnEnter($event)">
        {{ data.todo_item }}</p>
      <button class="bg-red-600 text-white px-5 py-3 w-2/6 place-self-end mb-3 rounded-lg" @click="DeleteButton($event)">Delete
      </button>
    </div>
  </div>

</template>

<script>
import axios from 'axios';


const url = import.meta.env.VITE_API_URL;

export default {
  computed: {
  },
  data() {

    return {
      alldata: [],
      messages: [],
    };
  },
  setup(){

  },
  mounted() {
    this.FetchData();
  },
  methods: {
    FetchData() {
      const headers = {
        headers: {
          'Authorization': 'Bearer ' + "asdasd",
        }
      }
      axios.get(url,headers).then((res) => {
        this.alldata = res.data.data;
      })
    },
    DeleteButton(event) {

      const getParent = event.target.parentNode;
      const getID = getParent.children[0].textContent;
      getParent.remove();
      const delUrl = `${url}/${getID}`;
      axios.delete(delUrl).then(() => {
        this.FetchData();
      })

    },
    AddButton(event){
      const getInput = event.target.previousElementSibling.value;
      if (getInput.length === 0){
        alert("Todo cannot be empty")
      }
      else {
        const data ={
          todo_item: getInput,
        }
        axios.post(url,data).then(() => {
          this.FetchData();
        })
        const getInputHTML = event.target.previousSibling;
        getInputHTML.value = '';
      }

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
      axios.put(editUrl, data, config).then(() => {
        this.FetchData();
      });
    },
    OnEnter(event) {
      event.target.blur();
    },
    ClickAdd(event){
      const getButton = event.target.nextElementSibling;
      // console.log(getButton);
      getButton.click();
    }
  }
}
</script>

<style scoped>

</style>