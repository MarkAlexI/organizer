<template>
  <div>
    <h2>Calendar</h2>
    <div class="schedule">
      <div class="calendar-bar">
        <button class="prev btn" v-on:click="prevNextMonth(-1)">&ltcc;
        </button>
        <div class="current-month">
          {{ currentMonth }}
        </div>
        <button class="next btn" v-on:click="prevNextMonth(1)">&gtcc;
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

      <div v-html="calendarDays" class="calendar-days" @click="getActiveDate">

      </div>

      <div class="goto-buttons">
        <button type="button" class="btn prev-year" @click="prevNextYear(-1)">Prev Year
        </button>
        <button type="button" class="btn today" @click="prevNextYear(0)">Today
        </button>
        <button type="button" class="btn next-year" @click="prevNextYear(1)">Next Year
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { inject, ref, watch, onMounted } from "vue";

  const daysWithNotes = inject('daysWithNotes', []);
  watch(daysWithNotes, () => {
    setCalendar();
  });


  const emit = defineEmits(['newactivedate']);
  const date = ref(new Date());
  const today = ref(new Date().setHours(0, 0, 0, 0));
  const activeDate = ref("2 Dfg 123");
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

  const getActiveDate = (event) => {
    if (event.target.closest('.month-day') || event.target.closest('.current-day')) {
      activeDate.value = event.target.innerText + ' ' + currentMonth.value;
      emit('newactivedate', activeDate.value);
    }
  };

  const setCalendar = () => {
    const prevLastDay = new Date(date.value.getFullYear(), date.value.getMonth(), 0).getDate();
    const totalMonthDay = new Date(date.value.getFullYear(), date.value.getMonth() + 1, 0).getDate();
    let firstWeekDay = new Date(date.value.getFullYear(), date.value.getMonth(), 1).getDay();
    if (firstWeekDay < 2) firstWeekDay += 7;
    const totalDays = 7 * 6;
    calendarDays.value = '';

    today.value = new Date().setHours(0, 0, 0, 0);
    takeCurrentMonth();

    for (let i = 0; i < totalDays; i++) {
      let day = i - firstWeekDay + 2;
      if (i <= firstWeekDay - 2) {
        calendarDays.value = `<div class="prev-day">${prevLastDay - i}</div>` + calendarDays.value;
      } else if (i <= firstWeekDay + totalMonthDay - 2) {
        const newDate = new Date(date.value.valueOf());
        newDate.setDate(day);
        newDate.setHours(0, 0, 0, 0);

        const currDay = day + ' ' + currentMonth.value;
        let noteClass = '';
        if (daysWithNotes.value.includes(currDay)) noteClass = ' notes';

        const dayClass = newDate.valueOf() == today.value ? 'current-day' : 'month-day';
        calendarDays.value += `<div class='${dayClass + noteClass}'>${day}</div>`;
      } else {
        calendarDays.value += `<div class='prev-day'>${day - totalMonthDay}</div>`;
      }
    }

    activeDate.value = (date.value.getMonth() === new Date(today.value).getMonth() ? new Date(today.value).getDate() : '1') + ' ' + currentMonth.value;
    emit('newactivedate', activeDate.value);
  };

  onMounted(() => {
    setCalendar();
  });

  watch(date, setCalendar);
</script>

<style>
  h2 {
    font-size: 1.5rem;
    color: mediumpurple;
    padding-bottom: 8px;
  }

  .schedule {
    width: 285px;
    height: fit-content;
    background: -webkit-linear-gradient(to bottom right, greenyellow, yellowgreen);
    background: linear-gradient(to bottom right, greenyellow, yellowgreen);
    border-radius: 10px;
    box-shadow: 0px 0px 8px #000;
    margin-bottom: 8px;
  }

  .calendar-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px;
    padding-bottom: 10px;
    border-bottom: 15px;
  }

  .calendar-bar>.current-month {
    font-size: 20px;
    font-weight: bold;
    color: #ddd;
    background: darkblue;
    padding: 7px;
    border-radius: 6px;
  }

  .weekdays,
  .calendar-days {
    display: flex;
    flex-wrap: wrap;
    padding-inline: 15px;
  }

  .days {
    color: #fff;
    font-weight: 700;
  }

  .days,
  [class$="-day"] {
    width: 36px;
    height: 36px;
    color: #000;
    text-align: center;
    line-height: 36px;
    font-weight: 500;
    font-size: 1rem;
  }

  .month-day {
    cursor: pointer;
  }

  .current-day {
    background-color: darkblue;
    color: #fff;
    border-radius: 50%;
    font-weight: 700;
    transition: 0.5s;
    cursor: pointer;
  }

  .month-day:hover {
    font-weight: 900;
  }

  .notes {
    color: orange;
    width: 36px;
    height: 36px;
    text-align: center;
    line-height: 36px;
    font-weight: 700;
    font-size: 1rem;
  }

  .prev-day {
    color: #a5a5a5;
    user-select: none;
  }

  .btn {
    color: darkred;
    background: #eee;
    border: 1px solid yellow;
    border-radius: 10px;
    padding: 9px 11px;
    font-family: "Quicksand", sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    margin-right: 1px;
    box-shadow: 0px 0px 0px #000;
  }

  .btn:hover {
    background-color: #f8f7fa;
    color: #000;
    font-weight: 900;
    border: 1px solid orange;
    border-radius: 15px;
    transition: 0.2s;
    cursor: pointer;
  }

  .goto-buttons {
    border-top: solid 2px yellow;
    padding-block: 12px;
    display: flex;
    justify-content: space-evenly;
  }
</style>
