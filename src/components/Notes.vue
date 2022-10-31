<template>
  <div style="max-width: 360px;">
    <h2>Notes. Date: {{ keyDate }}.</h2>
    <div class="notepad">
      <textarea id="currentNote" cols="26" rows="6" allow="clipboard-read; clipboard-write"></textarea>
      <div class="controls">
        <button class="btn control save" v-on:click="saveNote()">Save</button>
        <button class="btn control clear" v-on:click="clearNote()">Clear</button>
        <button class="btn control copy" v-on:click="copyNote()">Copy</button>
        <button class="btn control prev" v-on:click="findNote(-1)">Prev</button>
        <button class="btn control next" v-on:click="findNote(1)">Next</button>
      </div>
    </div>

    <p id="info" v-if="notes.get(keyDate)">Your records:</p>

    <transition-group name="list" tag="ul">
      <li class="list-item" v-for="(note, index) in notes.get(keyDate)" :key="note">
        <a href="#" @click="info" :data-key="index">
          {{ note[0] }}
        </a>
        <p class="btn delete" @click="deleteNote(index)">Delete</p>
      </li>
    </transition-group>
  </div>
</template>

<script setup>
  import { reactive, inject, watch, onUnmounted } from "vue";

  const notes = reactive(new Map());
  const emit = defineEmits(['listofdates']);

  const clearNote = () => {
    currentNote.value = '';
  };

  if (navigator.permissions) {
    (async () => {
      const queryOpts = {
        name: 'clipboard-read',
        allowWithoutGesture: false
      };
      const permissionStatus = await navigator.permissions.query(queryOpts);
      console.log(permissionStatus.state);
    })();
  } else {
    console.log("Your navigator does not support copying to clipboard. Use Google Chrome instead.");
  }

  const copyNote = () => {
    const text = currentNote.value;

    navigator.clipboard.writeText(text).then(() => {
      console.log('Copying to clipboard was successful!');
    }, (err) => {
      console.error('Could not copy text: ', err);
    });
  };

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

  const findNote = (direction) => {
    const db = openRequest.result;
    const transaction = db.transaction(['notes'], 'readonly');

    const allNotes = transaction.objectStore('notes');
    const request = allNotes.getAllKeys();

    request.onsuccess = function() {
      if (request.result !== undefined) {
        if (request.result.indexOf(keyDate.value) === -1) request.result.push(keyDate.value);
        const dates = request.result
          .map(el => new Date(el))
          .sort((a, b) => a - b)
          .map(day => day.toLocaleString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' }));
        const index = dates.indexOf(keyDate.value);
        let day = '';
        if (index !== -1) day = dates[index + direction];
        currentNote.value = day ?
          'Closest day: ' + day + '.':
          notes.get(keyDate.value) ?
          'Closest day: today.' :
          'No records. Search another direction.';
      } else {
        console.log('No access');
      }
    };
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
  .notepad {
    display: flex;
    gap: 10px;
  }

  #currentNote {
    max-width: 324px;
    font-size: 1.2rem;
    margin-bottom: 10px;
    padding: 10px;
    max-width: 100%;
    line-height: 1.5;
    border-radius: 5px;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px #999;
  }

  .controls {
    flex-direction: row;
    flex-grow: 1;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .control {
    background-color: slateblue;
    margin-bottom: 10px;
    font-weight: 900;
    max-height: 50px;
    min-width: 30px;
    margin-right: 10px;
  }

  .control:last-child {
    margin-right: 0;
    margin-bottom: 5px;
  }

  .control:hover {
    background-color: steelblue;
  }

  .prev,
  .next {
    background-color: slategray;
  }

  #info {
    color: darkslateblue;
    margin-bottom: 2px;
  }

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
    margin-bottom: 11px;
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

  @media (min-width: 680px) {
    .notepad {
      flex-direction: column;
    }
  }
</style>