export const CounterButton = {
  template:
    '<button @click="increment" type="button">{{ internalCount }}</button>',

  data() {
    return {
      internalCount: this.count,
    };
  },

  props: {
    count: {
      type: Number,
      required: false,
      default: 0,
    },
  },

  methods: {
    increment: function () {
      this.internalCount++;
      this.$emit('increment', this.internalCount);
    },
  },
};
