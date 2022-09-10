<template>
  <div class="container">
    <MyHeader></MyHeader>
    <Calendar></Calendar>
    <Notes></Notes>
  </div>
</template>

<script>
import MyHeader from "./components/MyHeader.vue";
import Calendar from "./components/Calendar.vue";
import Notes from "./components/Notes.vue";

export default {
  name: 'App',
  data() {
    return {};
  },
  components: {
    MyHeader,
    Calendar,
    Notes
  },
};
</script>

<style>
  .container {
    margin: 10px 20px;
  }
</style>
