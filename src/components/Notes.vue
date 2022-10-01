<template>
  <h2>Notes. Date: {{ keyDate }}.</h2>
  <textarea name="" id="currentNote" cols="30" rows="10"></textarea>
  <button class="btn" v-on:click="saveNote()">Save.</button>

  <transition-group name="list" tag="ul">
    <li class="list-item" v-for="(note, index) in notes.get(keyDate)" :key="note">
      <a href="#" @click="info" :data-key="index">
        {{ note[0] }}
      </a>
      <p class="btn delete" @click="deleteNote(index)">Delete</p>
    </li>
  </transition-group>
  <p id="end"></p>
</template>

<script setup>
  import { reactive, inject, watch, onUnmounted } from "vue";

  const notes = reactive(new Map());
  const emit = defineEmits(['listofdates']);

  let openRequest = indexedDB.open('store', 1);

  openRequest.onupgradeneeded = () => {
    let db = openRequest.result;
    console.log(db.objectStoreNames, 'up');
    if (!db.objectStoreNames.contains('notes')) {
      db.createObjectStore('notes', { keyPath: 'id' });
    }
  };

  openRequest.onerror = () => {
    console.log('onerror', openRequest.error);
  };

  openRequest.onsuccess = () => {
    let db = openRequest.result;
    let transaction = db.transaction('notes', 'readonly');
    let allNotes = transaction.objectStore('notes');
    let request = allNotes.getAll();

    transaction.oncomplete = () => {
      console.table(request.result);
      if (request.result.length) {
        let temp = [];
        for (let note of request.result) {
          notes.set(note.id, JSON.parse(note.data));
          temp.push(note.id);
        }
        emit('listofdates', temp);
      }
    };
  };

  const changeNote = (key, value) => {
    let db = openRequest.result;
    let transaction = db.transaction(['notes'], 'readwrite');

    let allNotes = transaction.objectStore('notes');

    let note = {
      id: key,
      data: value
    };

    const request = value.length ? allNotes.put(note) : allNotes.delete(key);

    transaction.oncomplete = () => {
      console.log('done');
    };
    request.onsuccess = () => {
      console.log('add/delete', request.result);
    };
    request.onerror = () => {
      console.log('no add/delete', request.error);
    };
  };

  const keyDate = inject('keyDate', '1 April 2134');

  watch(keyDate, () => {
    currentNote.value = '';
  });

  const notesKeys = () => {
    let tmp = [];
    for (let i of notes) {
      tmp.push(i[0]);
    }
    return tmp;
  };

  const saveNote = () => {
    if (!currentNote.value.length) return;

    const time = new Date().toTimeString().slice(0, 8);
    let newData = [time, currentNote.value];
    if (notes.has(keyDate.value)) {
      let oldData = notes.get(keyDate.value);
      oldData.push(newData);
      notes.set(keyDate.value, oldData);

      changeNote(keyDate.value, JSON.stringify(oldData));
    } else {
      notes.set(keyDate.value, [newData]);

      changeNote(keyDate.value, JSON.stringify([newData]));
    }

    emit('listofdates', notesKeys());
  };

  const deleteNote = (index) => {
    const notesCopy = notes.get(keyDate.value).slice();
    notesCopy.splice(index, 1);
    if (notesCopy.length > 0) {
      notes.set(keyDate.value, notesCopy);
      changeNote(keyDate.value, JSON.stringify(notes.get(keyDate.value)));
    } else {
      notes.delete(keyDate.value);
      changeNote(keyDate.value, '');
      emit('listofdates', notesKeys());
    }
  };

  const info = () => {
    event.preventDefault();
    const index = event.currentTarget.dataset.key;
    currentNote.value = notes.get(keyDate.value)[index][1];
  }

  onUnmounted(() => {
    openRequest.result.close();
  });
</script>

<style scoped>
  a {
    display: inline-block;
    margin-bottom: 8px;
  }

  a:link {
    color: mediumpurple;
  }

  a:hover {
    color: hotpink;
  }

  a:active {
    color: mediumorchid;
  }

  li {
    margin-bottom: 13px;
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
