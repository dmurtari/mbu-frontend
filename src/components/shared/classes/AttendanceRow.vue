<template>
  <tr>
    <td>{{ badge }}</td>
    <td>{{ duration }}</td>
    <td>{{ assignees.length }}</td>
    <td v-for="n in 3"
        :key="n">
      <span :class="{ 'is-light': !offeredForPeriod(n) }">
        {{ scoutsForPeriod(n).length }}
      </span>
    </td>
    <td>
      <router-link :to="eventId + '/' + id">
        Details
      </router-link>
    </td>
  </tr>
</template>

<script>
import ScoutsForClass from './ScoutsForClass';

export default {
  props: {
    id: {
      type: Number,
      required: true
    },
    eventId: {
      type: Number,
      required: true
    },
    badge: {
      type: String,
      required: true
    },
    duration: {
      type: Number,
      required: true
    },
    scouts: {
      type: Array,
      default: () => []
    },
    offeredPeriods: {
      type: Array,
      required: true
    }
  },
  watch: {
    scouts() {
      this.assignees = this.scouts;
    }
  },
  methods: {
    offeredForPeriod(period) {
      return this.offeredPeriods.indexOf(period) > -1;
    }
  },
  mounted() {
    this.assignees = this.scouts;
  },
  mixins: [ScoutsForClass]
};
</script>

<style scoped lang="scss">
span.is-light {
  color: lightgray;
}
</style>
