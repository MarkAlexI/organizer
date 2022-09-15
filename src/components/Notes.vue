<template>
  <h2>Notes</h2>
  <textarea name="" id="currentNote" cols="30" rows="10"></textarea>
  <button class="btn" v-on:click="saveNote()">Save.</button>
  <ul class="" v-for="note in notes">
    <li class="">{{ note }}</li>
  </ul>
  <p id="end">Not implemented.</p>
</template>

<script setup>
  import { reactive } from "vue";
  
  const notes = reactive(new Map());
  const saveNote = () => {
    if (!currentNote.value.length) return;
        
    const time = new Date().toTimeString().slice(0, 8);
    notes.set(time, currentNote.value);
    console.log(Array.from(notes));
  };
</script>

<style>

</style>
