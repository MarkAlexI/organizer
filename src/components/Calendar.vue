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
        <div class="days">Mo</div>
        <div class="days">Tu</div>
        <div class="days">We</div>
        <div class="days">Th</div>
        <div class="days">Fr</div>
        <div class="days">Sa</div>
        <div class="days">Su</div>
      </div>
    </div>
    
    <div v-html="calendarDays" class="calendar-days">
      
    </div>
    
    <div class="goto-buttons">
      <button type="button" class="btn prev-year">Prev Year</button>
      <button type="button" class="btn today">Today</button>
      <button type="button" class="btn next-year" v-on:click="setCalendar">Next Year</button>
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
      const calendarDays = ref("<div>qwerty</div>");
      
      const takeCurrentMonth = () => {
        return currentMonth.value = date.value.toLocaleDateString("en-US", { month: 'long', year: 'numeric' })
      };
      
      const prevNextMonth = (route) => {
        date.value = new Date(date.value.setMonth(date.value.getMonth() + route));
      };
      
      const setCalendar = () => {
        const prevLastDay = new Date(date.value.getFullYear(), date.value.getMonth(), 0).getDate();
        const totalMonthDay = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0).getDate();
        const firstWeekDay = new Date(date.value.getFullYear(), date.value.getMonth(), 1).getDay();
        const totalDays = 7 * 6;
        calendarDays.value = '';
        
        for (let i = 0; i < totalDays; i++) {
          let day = i - firstWeekDay;
          if (i <= firstWeekDay) {
            calendarDays.value += `<div class="prev-day">${prevLastDay - i}</div>`;
          }
        }
      };
      
      onMounted(() => {
        takeCurrentMonth();
      });
    
      watch(date, takeCurrentMonth);
    
      return {
        date,
        today,
        currentMonth,
        calendarDays,
        takeCurrentMonth,
        prevNextMonth,
        setCalendar
      };
    },
  };
</script>

<style>
  h2 {
    font-size: 24px;
    color: mediumpurple;
  }
  .schedule {
    width: 300px;
    height: fit-content;
    background: -webkit-linear-gradient(to right, greenyellow, yellowgreen);
    background: linear-gradient(to right, greenyellow, yellowgreen);
    border-radius: 10px;
    box-shadow: 0px 0px 8px #000;
  }
  .calendar-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    padding-bottom: 15px;
    border-bottom: 19px;
  }
  .calendar-bar > .current-month {
    font-size: 20px;
    font-weight: bold;
    color: #ddd;
    background:#000;
    padding: 3px;
    border-radius: 6px;
  }
  btn {
    font-size: 20px;
    color: darkred;
  }
</style>
