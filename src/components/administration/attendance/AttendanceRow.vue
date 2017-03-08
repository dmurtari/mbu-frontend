<template>
  <div class="attendance-row">
    <h5 class="title is-5">
      Attendance for {{ scout.fullname }} (Troop {{ scout.troop }})
      <button class="button edit-button is-pulled-right"
              v-if="state === 'displaying'"
              @click="toggleState('assigning')">
        <span class="fa fa-edit" aria-label="Edit"></span>
      </button>
    </h5>
    <div v-if="state === 'displaying'">
      <scout-registration :event="event"
                          :preferences="registrationPreferences"
                          :purchases="registrationPurchases"
                          :assignments="registrationAssignments">
        <p slot="assignment-notification">
          {{ scout.fullname }} has not yet been assigned any merit badges for
          MBU {{ event.semester }} {{ event.year }}.
          <br>
          <a class="is-link"
              @click.prevent="toggleState('assigning')">
            Assign Merit Badges
          </a>
        </p>
      </scout-registration>
    </div>
    <assignment-edit v-if="state === 'assigning'"
                     :scout="scout"
                     :event="event"
                     :preferences="preferences"
                     :registration="registration"
                     @done="toggleState('displaying')"></assignment-edit>
  </div>
</template>

<script>
import _ from 'lodash';

import AssignmentEdit from './AssignmentEdit.vue';
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
  data() {
    return {
      state: 'displaying'
    };
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
  watch: {
    registration() {
      this.state = 'displaying';
    }
  },
  methods: {
    toggleState(state = 'displaying') {
      this.state = state;
    }
  },
  components: {
    AssignmentEdit,
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