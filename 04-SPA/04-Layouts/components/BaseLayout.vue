<template>
  <div>
    <the-header></the-header>
    <main class="main wrapper bg-grey">
      <slot></slot>
    </main>
    <the-footer></the-footer>
  </div>
</template>

<script>
import TheHeader from './TheHeader';
import TheFooter from './TheFooter';
export default {
  name: 'BaseLayout',
  components: { TheFooter, TheHeader },
};
</script>

<style scoped>
main {
  flex: 1 0 auto;
}
</style>
