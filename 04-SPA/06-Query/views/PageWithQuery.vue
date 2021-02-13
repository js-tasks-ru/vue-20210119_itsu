<template>
  <div class="container">
    <meetups-view
      :view.sync="view"
      :date.sync="date"
      :participation.sync="participation"
      :search.sync="search"
    />
  </div>
</template>

<script>
import MeetupsView from '../components/MeetupsView';

const defaultValues = {
  view: 'list',
  date: 'all',
  participation: 'all',
  search: '',
};

export default {
  name: 'PageWithQuery',
  components: { MeetupsView },
  data() {
    return { ...defaultValues };
  },
  watch: {
    $data: {
      handler: function (currentData) {
        this.syncQueryParams(currentData);
      },
      deep: true,
    },
    '$route.query': {
      handler: function () {
        const queryParams = this.$route.query;
        const notMatchingDataKeys = Object.keys(queryParams).filter(
          (key) => queryParams[key] !== this.$data[key],
        );
        if (notMatchingDataKeys.length) {
          notMatchingDataKeys.forEach((key) => {
            this[key] = queryParams[key];
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    syncQueryParams: function (data) {
      const nextQueryParams = { ...data };
      Object.keys(nextQueryParams).forEach((key) => {
        if (nextQueryParams[key] === defaultValues[key]) {
          delete nextQueryParams[key];
        }
      });

      const notMatchingQueryKeys = Object.keys(nextQueryParams).filter(
        (key) => nextQueryParams[key] !== this.$route.query[key],
      );
      const hadKeysButDontMatch =
        Object.keys(nextQueryParams).length &&
        Object.keys(this.$route.query).length &&
        notMatchingQueryKeys.length;
      if (hadKeysButDontMatch || !Object.keys(nextQueryParams).length) {
        this.$router.replace({
          path: this.$route.path,
          query: nextQueryParams,
        });
      }
    },
  },
};
</script>

<style scoped></style>
