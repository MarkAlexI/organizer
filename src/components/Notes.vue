<template>
  <h2>Notes. Date: {{ keyDate }}.</h2>
  <textarea name="" id="currentNote" cols="30" rows="10"></textarea>
  <button class="btn" v-on:click="saveNote()">Save.</button>

  <transition-group name="list" tag="ul">
    <li class="list-item" v-for="(note, index) in notes.get(keyDate)" :key="note">
      <a href="#" @click="info" :data-key="index">
        {{ note[0] }}
      </a>
    </li>
  </transition-group>
  <p id="end"></p>
</template>

<script setup>
  import { reactive, inject, watch } from "vue";

  const emit = defineEmits(['listofdates']);
  const keyDate = inject('keyDate', '1 April 2134');

  watch(keyDate, () => {
    currentNote.value = '';
  });

  const notes = reactive(new Map());
  
  const saveNote = () => {
    if (!currentNote.value.length) return;

    const time = new Date().toTimeString().slice(0, 8);
    let newData = [time, currentNote.value];
    if (notes.has(keyDate.value)) {
      let oldData = notes.get(keyDate.value);
      oldData.push(newData);
      notes.set(keyDate.value, oldData);
    } else {
      notes.set(keyDate.value, [newData]);
    }
    
    let notesKeys = [];
    for (let i of notes) {
      notesKeys.push(i[0]);
    }

    emit('listofdates', notesKeys);
  };

  const info = () => {
    event.preventDefault();
    const index = event.currentTarget.dataset.key;
    currentNote.value = notes.get(keyDate.value)[index][1];
  }

</script>

<style scoped>
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
