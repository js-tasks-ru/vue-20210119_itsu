export const CounterButton = {
  template:
    '<button @click="increment" type="button">{{ count }}</button>',

  data() {
    return {};
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
      this.$emit('increment', this.count + 1);
    },
  },
};
