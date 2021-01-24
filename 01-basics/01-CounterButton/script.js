import Vue from './vue.esm.browser.js';

new Vue({
  el: '#app',
  data: {
    counter: 0,
  },
  methods: {
    incrementCounter: function () {
      this.counter++;
    },
  },
});
