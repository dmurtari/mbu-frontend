<template>
  <div>
    <p>
      <b>Item Name: </b>{{ purchasable.item }}
    </p>
    <p>
      <b>Price: </b>{{ purchasable.price | currency }}
    </p>
    <p v-if="purchasable.description">
      <b>Description: </b>{{ purchasable.description }}
    </p>
    <p v-if="purchasable.purchaser_limit">
      <b>Purchase Limit: </b>{{ purchasable.purchaser_limit }}
    </p>
    <p>
      <b>Quantity Purchased: </b>{{ purchasable.purchaser_count }}
    </p>
    <p v-if="purchasable.has_size">
      <br>
      Scouts can pick a size for this item
    </p>
    <br>
    <p>
      The minimum purchaser age is: {{ purchasable.minimum_age ? purchasable.minimum_age : 'not set' }}
    </p>
    <p>
      The maximum purchaser age is: {{ purchasable.maximum_age ? purchasable.maximum_age : 'not set' }}
    </p>
  </div>
</template>

<script>
export default {
  props: {
    purchasable: {
      type: Object,
      required: true
    }
  }
};
</script>
