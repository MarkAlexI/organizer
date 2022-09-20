<template>
  <div class="container">
    <MyHeader></MyHeader>
    <Calendar @newactivedate="changeDate"></Calendar>
    <Notes></Notes>
  </div>
</template>

<script setup>
  import { ref, provide } from "vue";
  import MyHeader from "@/MyHeader";
  import Calendar from "@/Calendar";
  import Notes from "@/Notes";

  const keyDate = ref("35 Dfg 3214");
  const changeDate = (event) => keyDate.value = event;
  
  provide('keyDate', keyDate);
</script>

<style>
  * {
    margin: 0;
    padding: 0;
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
