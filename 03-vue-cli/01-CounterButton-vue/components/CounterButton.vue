<template>
  <button @click="increment" type="button">{{ count }}</button>
</template>

<script>
export default {
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
</script>

<style></style>
