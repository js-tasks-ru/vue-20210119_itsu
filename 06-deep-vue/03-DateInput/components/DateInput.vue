<template>
  <AppInput
    v-bind="$attrs"
    v-on="this.listeners"
    :value="this.formattedValue"
    :type="this.type"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

const shouldIncludeSeconds = (step) => step && step !== 60;
const padValue = (value) => String(value).padStart(2, '0');

const getFormattedDateValue = (date) => {
  const paddedMonth = padValue(date.getUTCMonth() + 1);
  const paddedDate = padValue(date.getUTCDate());
  return `${date.getUTCFullYear()}-${paddedMonth}-${paddedDate}`;
};

const getFormattedTimeValue = (date, shouldIncludeSeconds) => {
  const hours = padValue(date.getUTCHours());
  const minutes = padValue(date.getUTCMinutes());
  const seconds = padValue(date.getUTCSeconds());
  const part = `${hours}:${minutes}`;
  return shouldIncludeSeconds ? `${part}:${seconds}` : part;
};

const getFormattedDateTimeValue = (date, shouldIncludeSeconds) => {
  return `${getFormattedDateValue(date)}T${getFormattedTimeValue(
    date,
    shouldIncludeSeconds,
  )}`;
};

export default {
  name: 'DateInput',

  components: { AppInput },

  props: {
    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {},
    valueAsNumber: Number,
    valueAsDate: Date,
    type: {
      type: String,
      default: 'date',
      validator: function (value) {
        return ['date', 'time', 'datetime-local'].indexOf(value) !== -1;
      },
    },
  },

  computed: {
    dateValue: function () {
      if (this.valueAsNumber) {
        return new Date(this.valueAsNumber);
      }
      if (this.valueAsDate) {
        return new Date(this.valueAsDate);
      }
      return new Date(this.value);
    },
    formattedValue: function () {
      if (this.type === 'time') {
        return getFormattedTimeValue(
          this.dateValue,
          shouldIncludeSeconds(this.$attrs.step),
        );
      }
      if (this.type === 'datetime-local') {
        return getFormattedDateTimeValue(this.dateValue);
      }
      return getFormattedDateValue(this.dateValue);
    },
    listeners: function () {
      return {
        ...this.$listeners,
        input: (value) => {
          const newDateValue = new Date(this.dateValue);
          if (this.type === 'time') {
            const [hours, minutes, seconds] = value.split(':');
            newDateValue.setUTCHours(hours);
            newDateValue.setUTCMinutes(minutes);
            seconds && newDateValue.setUTCSeconds(seconds);
          }

          if (this.type === 'date') {
            const date = new Date(value);
            newDateValue.setUTCFullYear(date.getUTCFullYear());
            newDateValue.setUTCMonth(date.getUTCMonth());
            newDateValue.setUTCDate(date.getUTCDate());
          }

          if (this.type === 'datetime-local') {
            const date = new Date(value);
            newDateValue.setUTCFullYear(date.getFullYear());
            newDateValue.setUTCMonth(date.getMonth());
            newDateValue.setUTCDate(date.getDate());
            newDateValue.setUTCHours(date.getHours());
            newDateValue.setUTCMinutes(date.getMinutes());
            newDateValue.setUTCSeconds(date.getSeconds());
          }

          this.$emit('input', value);
          this.$emit('update:valueAsDate', newDateValue);
          this.$emit('update:valueAsNumber', +newDateValue);
        },
      };
    },
  },
};
</script>

<style scoped></style>
