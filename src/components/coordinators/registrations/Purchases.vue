<template>
  <div>
    <h5 class="title is-5">
      Items Available for Purchase ({{ event.semester }} {{ event.year }})
    </h5>
    <p>
      Add items that this scout would like to purchase for this event by picking
      an item from the dropdown, and entering a quantity and size (if applicable).
      View details about these items on the <router-link to="/events">events
      page.</router-link>
    </p>
    <br>
    <div class="notification is-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <div class="columns is-mobile" v-if="unpurchasedItems.length > 0">
      <div class="control column is-3-mobile is-5-tablet">
        <label class="label" for="purchasable-item-select">Item</label>
        <span class="select">
          <select id="purchasable-item-select"
                  class="input"
                  v-model="itemToPurchase.purchasable">
            <option v-for="purchasable in unpurchasedItems" :value="purchasable">
              {{ purchasable.item }} ({{ purchasable.price | currency }})
            </option>
        </span>
      </div>
      <div class="control column is-3-mobile is-2-tablet">
        <label class="label" for="purchasable-item-quantity">Quantity</label>
        <input type="number"
               class="input"
               id="purchasable-item-quantity"
               :class="{ 'is-danger': $v.itemToPurchase.quantity.$error && itemToPurchase.purchasable }"
               @blur="$v.itemToPurchase.quantity.$touch"
               v-model="itemToPurchase.quantity">
        <span class="help is-danger"
              v-if="$v.itemToPurchase.quantity.$error && itemToPurchase.purchasable">
          Please enter a number greater than 0
        </span>
      </div>
      <div class="control column is-3-mobile is-2-tablet">
        <label class="label" for="purchasable-item-size">Size</label>
        <span class="select">
          <select type="select"
                  class="input"
                  :class="{ 'is-disabled': !itemToPurchase.purchasable || !itemToPurchase.purchasable.has_size }"
                  v-model="itemToPurchase.size">
            <option v-for="size in sizes" :value="size.value">
              {{ size.text }}
            </option>
          </select>
        </span>
      </div>
      <div class="column auto">
        <label class="label">&nbsp;</label>
        <button class="button is-primary"
                :class="{ 'is-disabled is-loading': creating }"
                @click="purchaseItem()">
          <span class="fa fa-check"></span>
        </button>
        <button class="button is-light"
                :class="{ 'is-disabled': creating }"
                @click="clearItem()">
          <span class="fa fa-times"></span>
        </button>
      </div>
    </div>
    <div class="notification" v-else>
      <p>
        There are no items listed as available for purchase at this event yet.
        Please check back later.
      </p>
    </div>
    <div class="columns is-multiline is-mobile" v-if="existingPurchases.length > 0">
      <div class="column is-12">
        <h5 class="title is-5">
          Items Already Purchased ({{ event.semester }} {{ event.year }})
        </h5>
      </div>
      <template v-for="item in existingPurchases">
        <div class="column is-6">
          <b>{{ item.item }}</b>:
          <span v-if="item.details.size">(Size {{ item.details.size | upperCase }})</span>
          {{ item.price | currency }} &times; {{ item.details.quantity }} =
          {{ item.price * item.details.quantity | currency }}
          <span class="tag is-danger delete-button"
                @click="deleteItem(item.id)">
            <span class="fa fa-trash"></span>
          </span>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { number } from 'validators';

export default {
  props: {
    event: {
      type: Object,
      required: true
    },
    registrationId: {
      required: true
    },
    scoutId: {
      required: true
    },
    existingPurchases: {
      type: Array
    },
    purchasables: {
      type: Array
    }
  },
  data() {
    return {
      itemToPurchase: {
        purchasable: '',
        quantity: '',
        size: ''
      },
      sizes: [
        { value: 'xs', text: 'XS' },
        { value: 's', text: 'S' },
        { value: 'm', text: 'M' },
        { value: 'l', text: 'L' },
        { value: 'xl', text: 'XL' }
      ],
      error: '',
      creating: false,
      deleting: false
    };
  },
  computed: {
    orderedPurchasables() {
      return _.orderBy(this.purchasables, 'item');
    },
    unpurchasedItems() {
      return _.filter(this.orderedPurchasables, (purchasable) => {
        return !_.find(this.existingPurchases, { 'id': purchasable.id });
      });
    },
    shouldShowPurchases() {
      return this.existingPurchases.length > 0;
    }
  },
  methods: {
    clearItem() {
      this.itemToPurchase = {
        purchasable: '',
        quantity: '',
        size: ''
      };
    },
    deleteItem(purchasableId) {
      this.$store.dispatch('deletePurchase', {
        registrationId: this.registrationId,
        scoutId: this.scoutId,
        purchasableId: purchasableId
      })
        .then(() => {
          this.error = '';
        })
        .catch(() => {
          this.error = 'Unable to delete. Please try again or contact an administration';
        })
    },
    purchaseItem() {
      let purchase = {
        purchasable: this.itemToPurchase.purchasable.id,
        quantity: this.itemToPurchase.quantity ? this.itemToPurchase.quantity : 0
      }

      if (this.itemToPurchase.size) {
        purchase.size = this.itemToPurchase.size;
      }

      this.creating = true;
      this.$store.dispatch('addPurchase', {
        registrationId: this.registrationId,
        scoutId: this.scoutId,
        purchase: purchase
      })
        .then(() => {
          this.creating = false;
          this.error = '';
          this.clearItem();
        })
        .catch(() => {
          this.creating = false;
          this.error = 'Unable to purchase item. Please refresh and try again';
        });
    }
  },
  validations: {
    itemToPurchase: {
      quantity: {
        required,
        number,
        positive: (value) => { return value > 0 }
      }
    }
  }
}
</script>

<style class="sass" scoped>
  .delete-button {
    cursor: pointer;
  }
</style>