<template>
  <h2>Notes</h2>
  <textarea name="" id="currentNote" cols="30" rows="10"></textarea>
  <button class="btn" v-on:click="saveNote()">Save.</button>
  <ul class="" v-for="note in notes">
    <li class="">
      <a href="#" v-on:click="info">
        {{ note[0] }}
      </a>
      </li>
  </ul>
  <p id="end"></p>
</template>

<script setup>
  import { reactive, inject, watchEffect } from "vue";
  
  const keyDate = inject('keyDate', '1 April 2134');
  watchEffect(() => {
    console.log(keyDate.value);
  });

  
  const notes = reactive(new Map());
  const saveNote = () => {
    if (!currentNote.value.length) return;
        
    const time = new Date().toTimeString().slice(0, 8);
    notes.set(time, currentNote.value);
  };

  const info = (event) => {
    event.preventDefault();
    const readingNote = event.currentTarget.innerText;
    currentNote.value = notes.get(readingNote);
  }
</script>
<style>

</style>
