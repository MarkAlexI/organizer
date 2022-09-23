<template>
  <h2>Notes</h2>
  <textarea name="" id="currentNote" cols="30" rows="10"></textarea>
  <button class="btn" v-on:click="saveNote()">Save.</button>

  <transition-group name="list" tag="ul">
    <li class="list-item" v-for="note in notes" :key="note">
      <a href="#" v-on:click="info">
        {{ note[0] }}
      </a>
    </li>
  </transition-group>
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
  a:link {
    color: mediumpurple;
  }
  a:hover {
    color: hotpink;
  }

  a:active {
    color: mediumorchid;
  }

  .list-item {
    display: inline-block;
    margin-right: 25px;
  }

  .list-enter-active,
  .list-leave-active {
    transition: all 1s ease;
  }

  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

  .list-item-move {
    transition: transform .8s ease;
  }
</style>
