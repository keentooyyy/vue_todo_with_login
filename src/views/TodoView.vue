<template>
  <div> TodoView</div>
  <RouterLink to="/">Go to Home</RouterLink>
  <div v-for="data in alldata">
    <p id="todo_id" class="hidden">{{ data.id }}</p>
    <p class="text-2xl">{{ data.todo_item }}</p>
    <button @click="" class="bg-green-600 text-white mx-10 my-5 px-5 py-3">Edit</button>
    <button @click="DeleteButton($event)" class="bg-red-600 text-white mx-10 my-5 px-5 py-3">Delete</button>
  </div>
</template>

<script>
import axios from 'axios';


const url = import.meta.env.API_URL;


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
        // console.log(res)
        this.alldata = res.data.data;
        // console.log(this.alldata)
      })
    },
    DeleteButton(event) {
      const getID = document.getElementById('todo_id').innerText
      const getParent  = event.target.parentNode;
      getParent.remove();
      const delUrl = `${url}/${getID}`;
      axios.delete(delUrl).then((res) => {
        // console.log(res.data.message);
        alert(res.data.message);
      })
    //
    },
  }
}
</script>

<style scoped>

</style>