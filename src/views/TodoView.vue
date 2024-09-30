<template>
  <div> To Do List</div>
  <hr>
  <RouterLink to="/">Go to Home</RouterLink>
  <div v-for="data in alldata">
    <p id="todo_id" class="hidden">{{ data.id }}</p>
    <p class="text-2xl">{{ data.todo_item }}</p>
    <button class="bg-green-600 text-white mx-10 my-5 px-5 py-3" @click="">Edit</button>
    <button class="bg-red-600 text-white mx-10 my-5 px-5 py-3" @click="DeleteButton($event)">Delete</button>
  </div>
</template>

<script>
import axios from 'axios';
const url = import.meta.env.VITE_API_URL;

export default {
  name: "todo",
  data() {
    return {
      alldata: [],
    };
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
      const getID = document.getElementById('todo_id').innerText
      const getParent = event.target.parentNode;
      getParent.remove();
      const delUrl = `${url}/${getID}`;
      axios.delete(delUrl).then((res) => {
        alert(res.data.message);
      })
      //
    },
  }
}
</script>

<style scoped>

</style>