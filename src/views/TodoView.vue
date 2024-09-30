<template>
  <div @click="fetchData">From TodoView</div>
  <RouterLink to="/">Go to Home</RouterLink>
<!--  <h1>{{ data.message }}</h1>-->
  <p v-for="one_data of alldata" :key="one_data.id">
    {{one_data.message}}
  </p>
</template>

<script>
import axios from 'axios';


const url = "http://localhost:8000/api/v1/todos"


export default {
  name: "todo",
  data() {
    return {
      alldata: []
    };
  },
  mounted() {
    this.FetchData();
  },
  methods: {
    FetchData() {
      axios.get(url).then((res) => {
        this.alldata = res.data;
        console.log(this.alldata)
      })
    }
  }
}
</script>

<style scoped>

</style>