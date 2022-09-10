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
  components: {
    MyHeader,
    Calendar,
    Notes
  },
};
</script>

<style>
  * {
    margin: 0;  padding: 0;
  }

  body {
    height: 100vh;
    background: #ddd;
    display: flex;
    justify-content: center;
    font-family: "Arial", sans-serif;
    user-select: none;
  }
  .container {
    margin: 10px 20px;
  }
</style>
