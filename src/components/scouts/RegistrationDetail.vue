<template>
  <div class="columns">
    <div class="column auto">
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
          <li v-for="preference in preferences">
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
          <li v-for="purchase in purchases">
            {{ purchase.item }}:
            <span v-if="purchase.details.size">(Size {{ purchase.details.size | upperCase }})</span>
            {{ purchase.price | currency }} &times; {{ purchase.details.quantity }} =
            {{ purchase.price * purchase.details.quantity | currency }}
          </li>
        </ul>
      </p>
    </div>
    <div class="column is-1">
      <button class="button"
              @click="$emit('edit')"
              data-balloon="Modify Registration"
              data-balloon-pos="left"
              :disabled="!registrationOpen">
        <span class="fa fa-edit is-hidden-mobile" aria-label="Modify"></span>
        <span class="is-hidden-tablet">Modify Registration</span>
      </button>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    scout: {
      type: Object,
      required: true
    },
    event: {
      type: Object,
      required: true
    },
    registration: {
      type: Object,
      required: true
    }
  },
  computed: {
    offerings() {
      return this.event.offerings;
    },
    preferences() {
      return _.map(this.registration.preferences, (preference) => {
        let offering = _.find(this.offerings, { id: preference.badge_id });
        return {
          name: offering.name,
          price: offering.details.price
        }
      });
    },
    preferenceCosts() {
      return _.reduce(this.preferences, (sum, preference) => {
        return sum + Number(preference.price);
      }, 0);
    },
    purchases() {
      return this.registration.purchases || [];
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
    registrationOpen() {
      return moment().isBetween(this.event.registration_open,
        this.event.registration_close,
        null,
        '[]');
    }
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