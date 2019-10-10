<template>
  <div class="wrapper">
    <span class="date-part">{{ datePart }}</span>
    <div class="time-part">
      {{ timePart }}
      <span v-if="config.modules.clock.showSeconds" class="seconds">{{ this.time.second }}</span>
    </div>
  </div>
</template>

<script>
import config from "./../../config.json";
import moment from "moment";

export default {
  name: "ClockModule",
  data() {
    return {
      date: {
        day: null,
        date: null,
        month: null,
        year: null
      },
      time: {
        hour: 0,
        minute: 0,
        second: 0
      },
      config: config
    };
  },
  computed: {
    datePart() {
      return `${this.date.day}, ${this.date.month} ${this.date.date}, ${this.date.year}`;
    },

    timePart() {
      return `${this.time.hour}:${this.time.minute}`;
    }
  },
  methods: {
    getDateAndTime() {
      setInterval(() => {
        this.resolveDate(moment());
        this.resolveTime(moment());
      }, 1000);
    },

    resolveDate(time) {
      this.date.day = time.format("dddd");
      this.date.date = time.format("d");
      this.date.month = time.format("MMMM");
      this.date.year = time.format("YYYY");
    },

    resolveTime(time) {
      this.time.hour = time.format("HH");
      this.time.minute = time.format("mm");
      this.time.second = time.format("ss");
    }
  },
  created() {
    moment.locale(config.config.language);
    this.getDateAndTime();
    this.$store.dispatch('updateClockData');
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 350px;
  margin-bottom: 50px;

  .date-part {
    display: flex;
    font-size: 30px;
  }

  .time-part {
    display: flex;
    flex-direction: row;
    font-size: 60px;
    color: #fff;
    justify-content: center;

    .seconds {
      font-size: 24px;
      color: #aaa;
      align-self: flex-end;
      padding-bottom: 10px;
    }
  }
}
</style>