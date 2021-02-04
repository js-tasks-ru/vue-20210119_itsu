function addDays(date, days) {
  var newDate = new Date(date.valueOf());
  newDate.setDate(newDate.getDate() + days);

  return newDate;
}

function addMonths(date, months) {
  const newDate = new Date(date.valueOf());
  const d = newDate.getDate();
  newDate.setMonth(newDate.getMonth() + months);
  if (newDate.getDate() !== d) {
    newDate.setDate(0);
  }

  return newDate;
}

function makeStartOfWeekDate(date) {
  // only monday for now :)
  const newDate = new Date(date);
  const day = newDate.getDay();
  const diff = newDate.getDate() - day + (day === 0 ? -6 : 1);
  newDate.setDate(diff);

  return newDate;
}

function makeDateString(date) {
  const year = date.getFullYear();
  const paddedMonth = (date.getMonth() + 1).toString().padStart(2, '0');
  const paddedDate = date.getDate().toString().padStart(2, '0');

  return `${year}-${paddedMonth}-${paddedDate}`;
}

function calculateDiffInDays(a, b) {
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
}

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `
    <div class='rangepicker'>
    <div class='rangepicker__calendar'>
      <div class='rangepicker__month-indicator'>
        <div class='rangepicker__selector-controls'>
          <button @click='displayPreviousMonth' class='rangepicker__selector-control-left'></button>
          <div>{{ localeAwareDateString }}</div>
          <button @click='displayNextMonth' class='rangepicker__selector-control-right'></button>
        </div>
      </div>
      <div class='rangepicker__date-grid'>
        <div v-for='dayData in daysData' :class='{rangepicker__cell: true, rangepicker__cell_inactive: dayData.isInactive}'>
          {{ dayData.dateLabel }}
          <a v-for='meetup in dayData.meetups' class='rangepicker__event'>{{ meetup.title }}</a>
        </div>
      </div>
    </div>
    </div>`,

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  data: () => ({
    date: new Date(),
  }),

  computed: {
    computedMeetups: function () {
      return this.meetups
        ? this.meetups.map((x) => ({
            ...x,
            dateString: makeDateString(new Date(x.date)),
          }))
        : [];
    },

    localeAwareDateString: function () {
      return this.date.toLocaleString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },

    daysData: function () {
      const startOfMonthDate = new Date(this.date);
      startOfMonthDate.setDate(1);
      const endOfMonthDate = new Date(
        startOfMonthDate.getFullYear(),
        startOfMonthDate.getMonth() + 1,
        0,
      );
      const startOfWeekDate = makeStartOfWeekDate(startOfMonthDate);
      const daysDifference = calculateDiffInDays(
        startOfWeekDate,
        endOfMonthDate,
      );
      const requiredNumberOfWeeksToRender = Math.ceil(daysDifference / 7);
      const daysData = [];
      for (let i = 0; i < requiredNumberOfWeeksToRender * 7; i++) {
        const currentDate = addDays(startOfWeekDate, i);
        const currentDateString = makeDateString(currentDate);
        daysData.push({
          isInactive: startOfMonthDate.getMonth() !== currentDate.getMonth(),
          dateLabel: currentDate.getDate(),
          meetups: this.computedMeetups.filter(
            (x) => x.dateString === currentDateString,
          ),
        });
      }
      return daysData;
    },
  },

  methods: {
    displayPreviousMonth: function () {
      this.date = addMonths(this.date, -1);
    },
    displayNextMonth: function () {
      this.date = addMonths(this.date, 1);
    },
  },
};
