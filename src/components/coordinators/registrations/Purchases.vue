<template>
  <div>
    <h5 class="title is-5">
      Items Available for Purchase ({{ event.semester }} {{ event.year }})
    </h5>
    <p>
      These items are available for purchase for this event. You can select an
      item and specify the quantity of each that this scout would like to
      purchase.
    </p>
    <br>
    <div class="columns">
      <div class="control column is-4">
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
      <div class="control column is-3">
        <label class="label" for="purchasable-item-quantity">Quantity</label>
        <input type="number"
               class="input"
               placeholder="Quantity"
               id="purchasable-item-quantity"
               v-model="itemToPurchase.quantity">
      </div>
      <div class="control column is-3" v-if="itemToPurchase.purchasable.has_size">
        <label class="label" for="purchasable-item-size">Size</label>
        <span class="select">
          <select type="select"
                  class="input"
                  v-model="itemToPurchase.size">
            <option v-for="size in sizes" :value="size.value">
              {{ size.text }}
            </option>
          </select>
        </span>
      </div>
      <div class="column is-2">
        <label class="label is-hidden-mobile">&nbsp;</label>
        <button class="button is-primary"
                @click="purchaseItem()">Add</button>
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
    registrationId: {
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
      ]
    };
  },
  computed: {
    orderedPurchasables() {
      return _.orderBy(this.purchasables, 'item');
    },
    unpurchasedItems() {
      return _.filter(this.orderedPurchasables, (purchasable) => {
        return !_.find(this.existingPurchases, { 'purchasable_id': purchasable.id });
      });
    }
  },
  methods: {
    purchaseItem() {
      let purchase = {
        purchasable: this.itemToPurchase.purchasable.id,
        quantity: this.itemToPurchase.quantity ? this.itemToPurchase.quantity : 0
      }

      if (this.itemToPurchase.size) {
        purchase.size = this.itemToPurchase.size;
      }

      console.log('Purchasing', purchase)
    }
  }
}
</script>