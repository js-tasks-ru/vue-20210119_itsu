import { agendaItemTitles, agendaItemIcons } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src='iconSrc' />
      </div>
      <div class="meetup-agenda__item-col">{{ agendaItem.startsAt }} - {{ agendaItem.endsAt }}</div>
      <div class="meetup-agenda__item-col">
        <h5 class="meetup-agenda__title">{{ title }}</h5>
        <p>
          <span>{{ agendaItem.speaker }}</span>
          <span class="meetup-agenda__dot"></span>
          <span class="meetup-agenda__lang">{{ agendaItem.language }}</span>
        </p>
        <p>{{ agendaItem.description }}</p>
      </div>
    </div>`,

  computed: {
    title: function () {
      return this.agendaItem.title || agendaItemTitles[this.agendaItem.type];
    },
    iconSrc: function () {
      const icon = agendaItemIcons[this.agendaItem.type];
      return `/assets/icons/icon-${icon}.svg`;
    },
  },

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  // Возможно, тут потребуется computed
};
