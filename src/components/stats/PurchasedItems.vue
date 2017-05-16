<template>
  <div>
    Purchase Details:

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
      let groupedItems = this.purchases;

      _.forEach(this.purchases, (items, key) => {
        if (items[0].has_size) {
          var result = _.chain(items)
            .groupBy('details.size')
            .toPairs()
            .map(pair => _.zipObject(['size', 'items'], pair))
            .value();
          groupedItems[key] = result;
        }
      });

      return groupedItems;
    }
  }
}
</script>