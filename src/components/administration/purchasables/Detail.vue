<template>
  <div>
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
    <div class="buyers-container">
      <a @click="toggleBuyers()">
        <h5 class="title is-5">Buyers<span class="toggle-icons">
            <span v-if="showingBuyers"
                  class="fa fa-chevron-circle-up"></span>
            <span v-else
                  class="fa fa-chevron-circle-down"></span>
          </span>
        </h5>
      </a>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import URLS from 'urls';

export default {
  data() {
    return {
      loading: false,
      error: '',
      buyers: undefined,
      showingBuyers: false
    };
  },
  props: {
    purchasable: {
      type: Object,
      required: true
    }
  },
  methods: {
    dismissError() {
      this.error = '';
    },
    toggleBuyers() {
      this.showingBuyers = !this.showingBuyers;

      if (this.showingBuyers && typeof this.buyers === 'undefined') {
        this.loadBuyers();
      }
    },
    loadBuyers() {
      this.loading = true;

      axios
        .get(
          `${URLS.EVENTS_URL}/${this.purchasable.event_id}/purchasables/${this.purchasable.id}/buyers`
        )
        .then(response => {
          this.buyers = response.data;
          this.error = '';
        })
        .catch(() => {
          this.error =
            'Failed to get buyers. Please refresh or try again later';
        })
        .then(() => {
          this.loading = false;
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.buyers-container {
  padding-top: 2rem;
}

.toggle-icons {
  padding-left: 10px;
}
</style>
