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
      let groupedItems = _.cloneDeep(this.purchases);

      _.forEach(this.purchases, (items, key) => {
        if (items[0].has_size) {
          let result = _.chain(items)
            .groupBy('details.size')
            .value();
          groupedItems[key] = result;
          groupedItems[key]['hasSize'] = true;
        }
      });

      return groupedItems;
    }
  }
}
</script>