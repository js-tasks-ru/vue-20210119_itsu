<template>
  <div>
    <h1>{{ this.title }}</h1>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'FormLayout',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped>
.forms {
  padding: 70px 0;
}
</style>
