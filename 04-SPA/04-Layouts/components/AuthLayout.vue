<template>
  <div>
    <h1>{{ this.title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AuthLayout',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>
