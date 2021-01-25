import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

const makeDateOnlyString = (date) => {
  const YYYY = date.getUTCFullYear();
  const MM = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const DD = date.getUTCDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
};

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data: {
    rawMeetup: null,
  },

  async created() {
    this.rawMeetup = await this.fetchData();
  },

  computed: {
    meetup() {
      if (!this.rawMeetup) {
        return null;
      }

      return {
        ...this.rawMeetup,
        coverStyle: this.rawMeetup.imageId
          ? {
              '--bg-url': `url('${this.makeMeetupCoverLink(
                this.rawMeetup.imageId,
              )}')`,
            }
          : {},
        date: this.rawMeetup.date
          ? new Date(this.rawMeetup.date).toLocaleString(navigator.language, {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          : null,
        dateOnlyString: this.rawMeetup.date
          ? makeDateOnlyString(new Date(this.rawMeetup.date))
          : null,
        agenda: this.rawMeetup.agenda
          ? this.rawMeetup.agenda.map((agendaItem) => ({
              ...agendaItem,
              title: agendaItem.title || agendaItemTitles[agendaItem.type],
              icon: agendaItemIcons[agendaItem.type],
            }))
          : [],
      };
    },
  },

  methods: {
    fetchData() {
      return fetch(`${API_URL}/meetups/${MEETUP_ID}`).then((res) => res.json());
    },
    makeMeetupCoverLink(imageId) {
      return `${API_URL}/images/${imageId}`;
    },
  },
});
