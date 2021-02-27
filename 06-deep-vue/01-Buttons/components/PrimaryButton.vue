<template>
  <base-button
    class="button_primary"
    v-bind="this.$attrs"
    v-on="this.$listeners"
  >
    <slot></slot>
  </base-button>
</template>

<script>
import BaseButton from './BaseButton';
export default {
  name: 'PrimaryButton',
  inheritAttrs: false,
  components: { BaseButton },
};
</script>

<style scoped>
.button_primary {
  background-color: var(--blue);
  border-color: var(--blue);
  color: var(--white);
}

.button_primary:hover {
  background-color: var(--blue-light);
  border-color: var(--blue-light);
}
</style>
