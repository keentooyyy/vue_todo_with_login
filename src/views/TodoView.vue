<template>
  <div class="mt-12 grid w-full bg-white place-self-center rounded-lg p-2 sm:max-w-xl sm:p-8">
    <div class="text-4xl p-6 text-center font-bold md:p-12"> To Do List</div>
    <hr class="mb-6">
    <div class="grid grid-cols-1 ">
      <input class="ring-1 ring-gray-500 mb-5 p-2 rounded-lg" type="text" @keydown.enter.prevent="ClickAdd($event)">
      <button class="bg-green-600 text-white px-5 py-3 place-self-start mb-3 rounded-lg" @click="AddButton($event)">Add
        Todo
      </button>
    </div>
    <div class="my-6 font-medium text-2xl md:text-3xl">My Todo(s)</div>
    <div class="flex gap-x-2 mb-5">
      <div class="bg-blue-500 text-xs text-white py-1 px-3 rounded-sm font-bold">TOTAL: {{ alldata.length }}</div>
      <div class="bg-green-600 text-xs text-white py-1 px-3 rounded-sm font-bold">COMPLETE: {{completed.length}}</div>
      <div class="bg-red-500 text-xs text-white py-1 px-5 rounded-sm font-bold">INCOMPLETE: {{alldata.length - completed.length}}</div>
    </div>

    <div v-for="data in alldata" class="grid grid-cols-2 items-center mb-5">
      <p id="todo_id" class="hidden">{{ data.id }}</p>
      <div class="flex gap-x-5 items-center">
        <input @change="Checked($event)" :value="data" v-model="completed" type="checkbox" class="border-none w-6 h-6 accent-blue-500 text-white bg-white">
        <p class="text-2xl outline-none " contenteditable="true" @blur="EditButton"
           @keydown.enter.prevent="OnEnter($event)">
          {{ data.todo_item }}</p>
      </div>
      <button class="bg-red-600 text-white px-5 py-3 place-self-end rounded-lg" @click="DeleteButton($event)">Delete
      </button>
    </div>
  </div>

</template>

<script>
import axios from 'axios';


const url = import.meta.env.VITE_API_URL;

export default {
  computed: {},
  data() {

    return {
      alldata: [],
      completed: [],

    };

  },
  updated() {
    // console.log(this.alldata.length);
  },
  setup() {

    // console.log(this.completed);
  },
  mounted() {
    // console.log(this.completed)
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
      const delUrl = `${url}/${getID}`;
      const findID = this.alldata.findIndex(index => index.id == getID);
      this.alldata.splice(findID, 1);
      axios.delete(delUrl)




    },
    AddButton(event) {
      const getInput = event.target.previousElementSibling.value;
      if (getInput.length === 0) {
        alert("Todo cannot be empty")
      } else {
        const data = {
          todo_item: getInput,
        }
        axios.post(url, data).then(() => {
          this.FetchData();
        })
        const getInputHTML = event.target.previousSibling;
        getInputHTML.value = '';
      }

    },
    EditButton(event) {
      const getParent = event.target.parentNode.parentNode;
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
    ClickAdd(event) {
      const getButton = event.target.nextElementSibling;
      getButton.click();
    },
    Checked(event){

      const getLabel = event.target.nextElementSibling;
      // console.log(getLabel)
      getLabel.classList.toggle('line-through');
    }

  }

}

</script>

<style scoped>

</style>