<template>
  <div class="attendance-row">
    <h5 class="title is-5">
      Attendance for {{ scout.fullname }}
    </h5>
    <div>
      <scout-registration :event="event"
                          :preferences="registrationPreferences"
                          :purchases="registrationPurchases"
                          :assignments="registrationAssignments"
                          :showProjectedCost="false"
                          :showPreferences="false">
        <p slot="assignment-notification">
          {{ scout.fullname }} has not yet been assigned any merit badges for
          MBU {{ event.semester }} {{ event.year }}.
        </p>
      </scout-registration>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

import ScoutRegistration from '../../scouts/ScoutRegistration.vue';

export default {
  props: {
    registration: {
      type: Object,
      required: true
    },
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    assignments() { return this.registration.assignments },
    assignmentList() {
      let result = [null, null, null];

      _.forEach(this.registration.assignments, (assignment) => {
        return _.forEach(assignment.details.periods, (period) => {
          result[Number(period) - 1] = assignment;
        });
      });

      return result;
    },
    scout() { return this.registration.scout },
    preferences() {
      return _.orderBy(this.registration.preferences, ['details.rank']);
    },
    purchases() { return this.registration.purchases },
    registrationAssignments() {
      return _.map(_.omitBy(this.assignmentList, _.isNil), (assignment) => {
        return {
          name: assignment.badge.name,
          price: assignment.price
        }
      });
    },
    registrationPreferences() {
      return _.map(this.preferences, (preference) => {
        return {
          name: preference.badge.name,
          price: preference.price
        };
      });
    },
    registrationPurchases() {
      return _.map(this.purchases, (purchase) => {
        return {
          price: purchase.price,
          size: purchase.details.size,
          item: purchase.item,
          quantity: purchase.details.quantity,
          id: purchase.id
        };
      });
    }
  },
  components: {
    ScoutRegistration
  }
}
</script>

<style lang="sass" scoped>
  .attendance-row {
    padding: 2rem 1rem;
    border-bottom: 1px lightgray solid;
  }
</style>