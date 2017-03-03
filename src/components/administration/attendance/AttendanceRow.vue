<template>
  <div class="attendance-row">
    <div class="level is-mobile">
      <div class="level-left">
        <h5 class="title is-5 level-item">
          Attendance for {{ scout.fullname }} (Troop {{ scout.troop }})
        </h5>
      </div>
      <div class="level-right">
        <button class="button level-item"
                @click="toggleState('assigning')">Edit</button>
      </div>
    </div>
    <div v-if="state === 'displaying'">
      <div class="attendance-section columns">
        <p class="column is-6">
          <b>Projected Cost of Attendance: </b>{{ projectedCost | currency }}
          <ul class="itemized-list">
            <li>Event Fee: {{ event.price | currency }}</li>
            <li>Merit Badge Fees: {{ preferenceCosts | currency }}</li>
            <li>Purchases: {{ purchaseCosts | currency }}</li>
          </ul>
        </p>
        <p class="column is-6">
          <b>Actual Cost of Attendance: </b>{{ actualCost | currency }}
          <ul class="itemized-list">
            <li>Event Fee: {{ event.price | currency }}</li>
            <li>Merit Badge Fees: {{ assignmentCosts | currency }}</li>
            <li>Purchases: {{ purchaseCosts | currency }}</li>
          </ul>
        </p>
      </div>
      <div class="attendance-preferences attendance-section">
        <b>Merit Badge Preferences:</b>
        <ul class="itemized-list attendance-list">
          <li v-for="preference in preferences" v-if="preferences.length > 0">
            {{ preference.details.rank }}: {{ preference.badge.name }}
            <span v-if="preference.price !== '0.00'">
              ({{ preference.price | currency }})
            </span>
          </li>
          <div v-else class="notification">
            This scout does not have any preferences listed for this event.
          </div>
        </ul>
      </div>
      <div class="attendance-purchases attendance-section" v-if="purchases.length > 0">
        <b>Purchases:</b>
        <ul class="itemized-list">
          <li v-for="purchase in purchases">
            {{ purchase.item }}
            <span v-if="purchase.details.size">
              (Size: {{ purchase.details.size | capitalize }})
            </span>
            {{ purchase.price | currency }} &times; {{ purchase.details.quantity }} =
            {{ purchase.price * purchase.details.quantity | currency }}
          </li>
        </ul>
      </div>
      <div class="attendance-assignments attendance-section">
        <b>Assignments:</b>
        <div class="attendance-section" v-if="assignments.length < 1">
          <div class="notification">
            {{ scout.fullname }} has not yet been assigned any merit badges for
            MBU {{ event.semester }} {{ event.year }}.
            <br>
            <a class="is-link"
               @click.prevent="toggleState('assigning')">
              Assign Merit Badges
            </a>
          </div>
        </div>
        <div v-else>
          <ul class="itemized-list">
            <li v-for="(assignment, index) in assignmentList">
              Period {{ index + 1 }}:
              {{ assignment.badge.name }}
              <span v-if="assignment.price !== '0.00'">
                ({{ assignment.price | currency }})
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <assignment-create v-if="state === 'assigning'"
                       :scout="scout"
                       :event="event"
                       :preferences="preferences"
                       :registration="registration"
                       @done="toggleState('displaying')"></assignment-create>
  </div>
</template>

<script>
import _ from 'lodash';

import AssignmentCreate from './AssignmentCreate.vue';

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
    scout() { return this.registration.scout },
    preferences() {
      return _.orderBy(this.registration.preferences, ['details.rank']);
    },
    assignments() { return this.registration.assignments },
    purchases() { return this.registration.purchases },
    actualCost() {
      return Number(this.event.price) + Number(this.assignmentCosts)
             + Number(this.purchaseCosts);
    },
    assignmentCosts() {
      return _.reduce(this.assignments, (sum, assignment) => {
        return sum + Number(assignment.price);
      }, 0);
    },
    assignmentList() {
      let result = [null, null, null];

      _.forEach(this.registration.assignments, (assignment) => {
        return _.forEach(assignment.details.periods, (period) => {
          result[Number(period) - 1] = assignment;
        });
      });

      return result;
    },
    preferenceCosts() {
      return _.reduce(this.preferences, (sum, preference) => {
        return sum + Number(preference.price);
      }, 0);
    },
    projectedCost() {
      return Number(this.event.price) + Number(this.preferenceCosts)
             + Number(this.purchaseCosts);
    },
    purchaseCosts() {
      return _.reduce(this.purchases, (sum, purchase) => {
        return sum + (Number(purchase.price) * Number(purchase.details.quantity));
      }, 0);
    }
  },
  methods: {
    toggleState(state = 'displaying') {
      this.state = state;
    }
  },
  components: {
    AssignmentCreate
  }
}
</script>

<style lang="sass" scoped>
  .attendance-row {
    padding: 2rem 1rem;
    border-bottom: 1px lightgray solid;
  }

  .attendance-section {
    margin-top: 1rem;
  }

  .attendance-list {
    columns: 2;
    column-gap: 3rem;
  }

  .itemized-list {
    margin-top: .5rem;
    padding-left: 1rem;
  }
</style>