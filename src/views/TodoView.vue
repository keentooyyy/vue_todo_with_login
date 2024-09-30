<template>
  <div> TodoView</div>
  <RouterLink to="/">Go to Home</RouterLink>
  <div v-for="a in alldata">
<!--    <p v-for="childData in data">{{ data }}</p>-->
    {{ a.data }}
  </div>
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
        // console.log(res.data)
        this.alldata = res;
        console.log(this.alldata)
      })
    }
  }
}
</script>

<style scoped>

</style>