<template>
  <div>
    <p>
      <b>Projected Cost of Attendance: </b>{{ projectedCost | currency }}
      <ul class="itemized-list">
        <li>Event Fee: {{ event.price | currency }}</li>
        <li>Merit Badge Fees: {{ preferenceCosts | currency }}</li>
        <li>Purchases: {{ purchaseCosts | currency }}</li>
      </ul>
    </p>
    <br>
    <p>
      <b>Merit Badge Preferences:</b>
      <ol class="preference-list">
        <li v-for="preference in preferences" :key="preference.name">
          {{ preference.name }}
          <span v-if="preference.price !== '0.00'">
            ({{ preference.price | currency }})
          </span>
        </li>
      </ol>
    </p>
    <p v-if="purchases.length > 0">
      <br>
      <b>Purchased Items:</b>
      <ul class="itemized-list">
        <li v-for="purchase in purchases" :key="purchase.id">
          {{ purchase.item }}:
          <span v-if="purchase.details.size">
            (Size {{ purchase.details.size | upperCase }})
          </span>
          {{ purchase.price | currency }} &times; {{ purchase.details.quantity }} =
          {{ purchase.price * purchase.details.quantity | currency }}
        </li>
      </ul>
    </p>
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
</style>