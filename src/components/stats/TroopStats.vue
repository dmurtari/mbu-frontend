<template>
  <div>
    <ul>
      <li>
        <b>Total Attendance: </b>{{ registrations.length }} scouts
      </li>
      <br>
      <li>
        <b>Total Due: </b>
        <span v-if="totalDue">{{ totalDue | currency }}</span>
        <span v-else>Calculating...</span>
      </li>
      <li>
        <b>Event Registration Fees</b>
        <span>
          {{ registrations.length * Number(event.price) | currency }}
          ({{ registrations.length }} &times;
           {{ event.price | currency }})
        </span>
      </li>
      <li>
        <b>Class Costs:</b>
        <span>{{ subcost('assignments') | currency }}</span>
      </li>
      <li>
        <b>Purchase Costs:</b>
        <span>{{ subcost('purchases') | currency }}</span>
      </li>
      <purchased-items :registrations="registrations"></purchased-items>
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
import URLS from 'urls';

import { mapGetters } from 'vuex';

import PurchasedItems from './PurchasedItems.vue';

export default {
  props: {
    event: {
      type: Object,
      required: true
    },
    registrations: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      error: '',
      loading: false,
      totalDue: null
    };
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  methods: {
    subcost (property) {
      if (!property) {
        return 0;
      }

      return _.reduce(this.registrations, (sum, registration) => {
        return sum += _.reduce(registration[property], (subsum, property) => {
          return subsum += Number(property.price) * (Number(property.details.quantity) || 1);
        }, 0);
      }, 0);
    }
  },
  mounted () {
    if (this.registrations.length > 0) {
      return axios.get(URLS.USERS_URL + this.profile.id + '/events/' + this.event.id + '/cost')
        .then((response) => {
          this.totalDue = response.data.cost;
          this.error = '';
        })
        .catch(() => {
          this.loading = false;
          this.error = 'Failed to get the necessary information for statistics.';
        })
    }
  },
  components: {
    PurchasedItems
  }
}
</script>