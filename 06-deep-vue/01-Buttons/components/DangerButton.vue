<template>
  <base-button
    class="button_danger"
    v-bind="this.$attrs"
    v-on="this.$listeners"
  >
    <slot></slot>
  </base-button>
</template>

<script>
import BaseButton from './BaseButton';

export default {
  name: 'DangerButton',
  inheritAttrs: false,
  components: { BaseButton },
};
</script>

<style scoped>
.button_danger {
  background-color: var(--white);
  border-color: var(--red);
  color: var(--red);
}

.button_danger:hover {
  border-color: var(--red-light);
}
</style>
