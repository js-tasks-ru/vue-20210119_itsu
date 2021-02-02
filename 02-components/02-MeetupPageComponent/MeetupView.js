import { MeetupCover } from './MeetupCover.js';
import { MeetupDescription } from './MeetupDescription.js';
import { MeetupAgenda } from './MeetupAgenda.js';
import { MeetupInfo } from './MeetupInfo.js';
import { getMeetupCoverLink } from './data.js';

export const MeetupView = {
  name: 'MeetupView',

  template: `
    <div>
      <MeetupCover :link='coverLink' :title='meetup.title' />
      <div class="container">
        <div class="meetup">
          <div class="meetup__content">
            <h3>Описание</h3>
            <MeetupDescription :description='meetup.description' />

            <h3>Программа</h3>
            <MeetupAgenda :agenda='meetup.agenda' />
          </div>
          <div class="meetup__aside">
            <MeetupInfo :organizer='meetup.organizer' :place='meetup.place' :date='meetupDate' />
          </div>
        </div>
      </div>
    </div>`,

  computed: {
    coverLink: function () {
      return this.meetup.imageId ? getMeetupCoverLink(this.meetup) : null;
    },
    meetupDate: function () {
      return this.meetup.date ? new Date(this.meetup.date) : null;
    },
  },

  components: { MeetupCover, MeetupDescription, MeetupInfo, MeetupAgenda },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },
};
