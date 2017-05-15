<template>
  <div>
    Purchase Details
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
      return _.flatten(_.map(this.registrations, 'purchases'));
    },
    groupedPurchases () {
      return _.groupBy(this.purchases, 'item');
    }
  }
}
</script>