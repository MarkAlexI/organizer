<template>
  <h2>Calendar</h2>
  <div class="schedule">
    <div class="calendar-bar">
      <button class="prev btn">&ltcc;</button>
      <div class="current-month">{{ (new Date()).toLocaleDateString("en-US", { month: 'long', year: 'numeric' }) }}</div>
      <button class="next btn" v-on:click="inc">&gtcc;</button>
    </div>
    <div class="calendar">
      <div class="weekdays">
        <div class="days"></div>
        <div class="days"></div>
        <div class="days"></div>
        <div class="days"></div>
        <div class="days"></div>
        <div class="days"></div>
        <div class="days"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Calendar",
    data() {
      return {
        
      };
    },
  };
</script>

<style>
  h2 {
    font-size: 24px;
    color: mediumpurple;
  }
  .calendar-bar {
    display: flex;
  }
  .current-month {
    font-size: 20px;
  }
</style>
