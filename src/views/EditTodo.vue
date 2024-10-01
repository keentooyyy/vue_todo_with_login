<script>
import axios from "axios";
import {useRoute} from "vue-router";

const url = import.meta.env.VITE_API_URL;

export default {
  setup() {
    const route = useRoute();
    // console.log(route);
    const routeID = route.params.id;
    return {
      routeID,
    }
  },
  data() {
    return {
      alldata: [],
    }

  },
  methods: {
    FetchData() {
      const getSpecificURL = `${url}/${this.routeID}`
      axios.get(getSpecificURL).then((res) => {
        this.alldata = res.data;
      })
    }
  },
  mounted() {
    this.FetchData()
  }
}
</script>

<template>
<h1 v-for="data in alldata">
  {{  data.todo_item  }}
</h1>
</template>

<style>
</style>