export const MeetupCover = {
  template: `<div class="meetup-cover" :style="coverStyle">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,

  computed: {
    coverStyle: function () {
      return this.link
        ? {
            '--bg-url': `url('${this.link}')`,
          }
        : {};
    },
  },

  props: {
    link: {
      type: String,
      required: false,
    },
    title: {
      type: String,
      required: false,
    },
  },
};
