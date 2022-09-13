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
    
    <div class="goto-buttons">
      <button type="button" class="btn prev-year">Prev Year</button>
      <button type="button" class="btn today">Today</button>
      <button type="button" class="btn next-year">Next Year</button>
    </div>
  </div>
</template>

<script>
  import { ref, watch, onMounted } from "vue";
  export default {
    props: {
      
    },
    name: "Calendar",
    setup(props, context) {
      const date = ref(new Date());
      const today = ref(new Date().setHours(0, 0, 0, 0));
      const currentMonth = ref("January 2022");
      
      const takeCurrentMonth = () => {
        return currentMonth.value = date.value.toLocaleDateString("en-US", { month: 'long', year: 'numeric' })
      };
      
      const prevNextMonth = (route) => {
        date.value = new Date(date.value.setMonth(date.value.getMonth() + route));
      
        takeCurrentMonth();
      };

      onMounted(() => {
        takeCurrentMonth();
      });
    
      return {
        date,
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
