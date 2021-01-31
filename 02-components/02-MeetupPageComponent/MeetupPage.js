import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `
    <div v-if='!meetup'>
      Loading...
    </div>
    <div v-else>
      <MeetupView :meetup='meetup' />
    </div>`,

  data: {
    meetup: null,
  },

  mounted: async function () {
    this.meetup = await fetchMeetup(MEETUP_ID);
  },

  methods: {
    fetchData: function (meetupId) {
      return fetchMeetup(meetupId);
    },
  },

  components: { MeetupView },
};
