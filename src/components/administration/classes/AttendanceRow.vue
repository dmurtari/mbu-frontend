<template>
  <tr>
    <td>{{ badge }}</td>
    <td>{{ duration }}</td>
    <td>{{ assignees.length }}</td>
    <td v-for="n in 3">
      <span :class="{ 'is-light': scoutsForPeriod(n).length < 1 }">
        {{ scoutsForPeriod(n).length }}
      </span>
    </td>
    <td>
      <router-link :to="'/administration/classes/' + id">
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
    }
  },
  mounted() {
    this.assignees = this.scouts;
  },
  mixins: [
    ScoutsForClass
  ]
}
</script>

<style scoped lang="sass">
  span.is-light {
    color: lightgray;
  }
</style>