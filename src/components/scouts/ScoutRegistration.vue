<template>
  <div>
    <div class="columns">
      <p class="column is-6">
        <b>Projected Costs: </b>{{ projectedCost | currency }}
        <ul class="itemized-list">
          <li>Event Fee: {{ event.price | currency }}</li>
          <li>Merit Badge Fees: {{ preferenceCosts | currency }}</li>
          <li>Purchases: {{ purchaseCosts | currency }}</li>
        </ul>
      </p>
      <p class="column is-6" v-if="assignments.length > 0">
        <b>Actual Costs: </b>{{ actualCost | currency }}
        <ul class="itemized-list">
          <li>Event Fee: {{ event.price | currency }}</li>
          <li>Merit Badge Fees: {{ assignmentCosts | currency }}</li>
          <li>Purchases: {{ purchaseCosts | currency }}</li>
        </ul>
      </p>
    </div>
    <div class="registration-section">
      <b>Merit Badge Preferences:</b>
      <div class="preference-list" v-if="preferences.length > 0">
        <ol>
          <li v-for="preference in preferences" :key="preference.name">
            {{ preference.name }}
            <span v-if="preference.price !== '0.00'">
              ({{ preference.price | currency }})
            </span>
          </li>
        </ol>
      </div>
      <div v-else class="notification">
        <slot name="preference-notification">
          This scout does not have any preferences listed for this event.
        </slot>
      </div>
    </div>
    <div v-if="purchases.length > 0" class="registration-section">
      <b>Purchased Items:</b>
      <ul class="itemized-list">
        <li v-for="purchase in purchases" :key="purchase.id">
          {{ purchase.item }}:
          <span v-if="purchase.size">
            (Size {{ purchase.size | upperCase }})
          </span>
          {{ purchase.price | currency }} &times; {{ purchase.quantity }} =
          {{ purchase.price * purchase.quantity | currency }}
        </li>
      </ul>
    </div>
    <div class="registration-section">
      <b>Assignments:</b>
      <div class="attendance-section" v-if="assignments.length < 1">
        <div class="notification">
          <slot name="assignment-notification">
            No Merit Badges have been assigned for MBU {{ event.semester }}
            {{ event.year }}.
          </slot>
        </div>
      </div>
      <div v-else>
        <ul class="itemized-list">
          <li v-for="(assignment, index) in assignments" :key="index">
            Period {{ index + 1 }}:
            <span v-if="!assignment">Unassigned</span>
            <span v-else>
              {{ assignment.name }}
              <span v-if="assignment.price !== '0.00'">
                ({{ assignment.price | currency }})
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      required: true
    },
    preferences: {
      type: Array,
      default: () => []
    },
    purchases: {
      type: Array,
      default: () => []
    },
    assignments: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    actualCost() {
      return Number(this.event.price) + Number(this.assignmentCosts)
             + Number(this.purchaseCosts);
    },
    assignmentCosts() {
      return _.reduce(this.assignments, (sum, assignment) => {
        return sum + Number(assignment.price);
      }, 0);
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
        return sum + (Number(purchase.price) * Number(purchase.quantity));
      }, 0);
    },
  }
}
</script>

<style lang="sass" scoped>
  .itemized-list {
    padding-top: .5rem;
    padding-left: 1rem;
  }

  .preference-list {
    padding-top: .5rem;
    padding-left: 2rem;
    columns: 2;
    column-gap: 3rem;
  }

  .registration-section {
    margin-top: 1.5rem;
  }

  .notification {
    margin-top: 1rem;
  }
</style>