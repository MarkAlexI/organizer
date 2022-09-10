<template>
  <h2>Calendar</h2>
  <div class="schedule">
    <div class="calendar-bar">
      <button class="prev btn"
              v-on:click="prevNextMonth(-1)"
              >&ltcc;
      </button>
      <div class="current-month">
        {{ currentMonth }}
      </div>
      <button class="next btn"
              v-on:click="prevNextMonth(1)"
              >&gtcc;
      </button>
    </div>
    <div class="calendar">
      <div class="weekdays">
        <div class="days">{{ today }}</div>
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
  import { ref, onMounted } from "vue";
  export default {
    props: {
      
    },
    name: "Calendar",
    setup(props, context) {
      const today = new Date().setHours(0, 0, 0, 0);
      const currentMonth = ref("January 2022");
      
      const takeCurrentMonth = (date = new Date()) => {
        if (typeof date !== 'object') date = new Date(date);
        return currentMonth.value = date.toLocaleDateString("en-US", { month: 'long', year: 'numeric' })
      };
      
      const prevNextMonth = (route) => {
        const date = new Date(currentMonth.value);
        const newDate = date.setMonth(date.getMonth() + route);
        currentMonth.value = takeCurrentMonth(newDate);
      };
      
      onMounted(() => {
        takeCurrentMonth();
      });
    
      return {
        today,
        currentMonth,
        takeCurrentMonth,
        prevNextMonth,
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
    padding: 0 3px;
    font-size: 20px;
  }
  btn {
    font-size: 20px;
    color: darkred;
  }
</style>
