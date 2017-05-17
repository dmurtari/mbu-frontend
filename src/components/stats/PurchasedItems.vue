<template>
  <div>
    <ul>
      <li v-for="(purchases, item) in groupedPurchases" :key="item">
        <span v-if="purchases.hasSize">
          <b>{{ item }}:</b>
          <ul class="subtotal">
            <li v-for="(items, size) in purchases.items" :key="size">
              <b>{{ size | capitalize }}</b>
              ({{ totalQuantity(items) }} &times; {{ items[0].price | currency }} =
               {{ totalDue(items) | currency }})
            </li>
          </ul>
        </span>
        <span v-else>
          <b>{{ item }}</b>
          ({{ totalQuantity(purchases) }} &times; {{ purchases[0].price | currency }} =
          {{ totalDue(purchases) | currency }})
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    registrations: {
      type: Array,
      required: true
    }
  },
  computed: {
    purchases () {
      return _.chain(this.registrations)
        .map('purchases')
        .flatten()
        .groupBy('item')
        .value();
    },
    groupedPurchases () {
      let groupedItems = _.cloneDeep(this.purchases);

      _.forEach(this.purchases, (items, key) => {
        if (items[0].has_size) {
          groupedItems[key] = {
            hasSize: true,
            items: []
          };

          let result = _.chain(items)
            .groupBy('details.size')
            .value();
          groupedItems[key].items = result;
        }
      });

      return groupedItems;
    }
  },
  methods: {
    totalDue (purchases) {
      return _.reduce(purchases, (sum, item) => {
        return sum += (Number(item.price) * Number(item.details.quantity));
      }, 0);
    },
    totalQuantity (purchases) {
      return _.reduce(purchases, (sum, item) => {
        return sum += Number(item.details.quantity)
      }, 0);
    }
  }
}
</script>

<style lang="scss">
.subtotal {
  padding-left: 1rem;
}
</style>
