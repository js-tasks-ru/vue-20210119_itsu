<template>
  <component
    :is="this.tag"
    class="button"
    :class="{ button_block: this.block }"
    v-bind="this.$attrs"
    v-on="this.$listeners"
  >
    <slot />
  </component>
</template>

<script>
export default {
  name: 'BaseButton',
  inheritAttrs: false,
  props: {
    block: Boolean,
    tag: {
      type: String,
      default: 'button',
      validator: function (value) {
        return ['button', 'a', 'router-link'].indexOf(value) !== -1;
      },
    },
  },
};
</script>

<style scoped>
.button {
  display: inline-block;
  padding: 10px 24px;
  font-weight: 700;
  font-size: 20px;
  line-height: 28px;
  color: initial;
  text-align: center;
  border: 4px solid transparent;
  transition: 0.2s all;
  outline: none;
  box-shadow: none;
  background-color: transparent;
  cursor: pointer;
  text-decoration: none;
}

.button.button_block {
  display: block;
  width: 100%;
}
</style>
