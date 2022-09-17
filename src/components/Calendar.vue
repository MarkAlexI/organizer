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
      <button type="button"
              class="btn prev-year"
              @click="prevNextYear(-1)"
             >Prev Year
      </button>
      <button type="button"
              class="btn today"
              @click="prevNextYear(0)"
             >Today
      </button>
      <button type="button"
              class="btn next-year"
              v-on:click="prevNextYear(1)"
             >Next Year
      </button>
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
      const calendarDays = ref("");
      
      const takeCurrentMonth = () => {
        return currentMonth.value = date.value.toLocaleDateString("en-US", { month: 'long', year: 'numeric' })
      };
      
      const prevNextMonth = (route) => {
        date.value = new Date(date.value.setMonth(date.value.getMonth() + route));
      };
      
      const prevNextYear = (route) => {
        if (route === 0) {
          date.value = new Date(today.value);
        } else {
          date.value = new Date(date.value.getFullYear() + route, 0, 1);
        }
      };
      
      const setCalendar = () => {
        const prevLastDay = new Date(date.value.getFullYear(), date.value.getMonth(), 0).getDate();
        const totalMonthDay = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0).getDate();
        const firstWeekDay = new Date(date.value.getFullYear(), date.value.getMonth(), 1).getDay();
        const totalDays = 7 * 6;
        calendarDays.value = '';
        
        today.value = new Date().setHours(0, 0, 0, 0);
        takeCurrentMonth();
        
        for (let i = 0; i < totalDays; i++) {
          let day = i - firstWeekDay;
          if (i <= firstWeekDay) {
            calendarDays.value = `<div class="prev-day">${prevLastDay - i}</div>` + calendarDays.value;
          } else if (i <= firstWeekDay + totalMonthDay) {
            date.value.setDate(day);
            date.value.setHours(0, 0, 0, 0);
            let dayClass = date.value.valueOf() === today.value.valueOf() ? 'current-day' : 'month-day';
            calendarDays.value += `<div class='${dayClass}'>${day}</div>`;
          } else {
            calendarDays.value += `<div class='prev-day'>${day - totalMonthDay}</div>`;
          }
        }
      };
      
      onMounted(() => {
        setCalendar();
      });
    
      watch(date, setCalendar);
    
      return {
        date,
        today,
        currentMonth,
        calendarDays,
        takeCurrentMonth,
        prevNextMonth,
        prevNextYear,
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
    width: 290px;
    height: fit-content;
    background: -webkit-linear-gradient(to bottom right, greenyellow, yellowgreen);
    background: linear-gradient(to bottom right, greenyellow, yellowgreen);
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
    background: darkblue;
    padding: 3px;
    border-radius: 6px;
  }
  .weekdays, .calendar-days {
    display: flex;
    flex-wrap: wrap;
    padding-inline: 15px;
  }
  .days {
    color: #fff;
    font-weight: 700;
  }
  .days, [class$="-day"] {
    width: 36px;
    height: 36px;
    color: #000;
    text-align: center;
    line-height: 36px;
    font-weight: 500;
    font-size: 1rem;
  }
  .current-day {
    background-color: darkblue;
    color: #fff;
    border-radius: 50%;
    font-weight: 700;
    transition: 0.5s;
    cursor: pointer;
  }
  .prev-day {
    color: #a5a5a5;
    user-select: none;
  }
  btn {
    font-size: 20px;
    color: darkred;
  }
</style>
