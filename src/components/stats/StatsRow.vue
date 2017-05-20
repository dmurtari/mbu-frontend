<template>
  <tr>
    <td>{{ registration.scout.fullname }}</td>
    <td>{{ registration.scout.troop }}</td>
    <td>{{ classForPeriod(1) }}</td>
    <td>{{ classForPeriod(2) }}</td>
    <td>{{ classForPeriod(3) }}</td>
    <td>
      <ul class="itemized-list">
        <li v-for="purchase in registration.purchases"
            :key="purchase.purchasable_id">
          {{ purchase.item }}:
          <span v-if="purchase.size">
            (Size {{ purchase.details.size | upperCase }})
          </span>
          {{ purchase.details.quantity }}
        </li>
      </ul>
    </td>
  </tr>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    registration: {
      type: Object,
      required: true
    }
  },
  computed: {
    purchases () {
      return
    }
  },
  methods: {
    classForPeriod (period) {
      let assignment = _.find(this.registration.assignments, (assignment) => {
        return _.includes(assignment.details.periods, period);
      });

      if (assignment) {
        return assignment.badge.name;
      } else {
        return 'No Assignment';
      }
    }
  }
}
</script>