<template>
  <div>
    <ul>
      <li>
        <b>Total Attendance: </b>{{ selectedRegistration.registrations.length }} scouts
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
          {{ selectedRegistration.registrations.length * Number(event.price) | currency }}
          ({{ selectedRegistration.registrations.length }} &times;
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
    </ul>
  </div>
</template>

<script>
import _ from 'lodash';
import axios from 'axios';
import URLS from 'urls';

import { mapGetters } from 'vuex';

export default {
  props: {
    event: {
      type: Object,
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
      'registrations',
      'profile'
    ]),
    selectedRegistration () {
      return _.find(this.registrations, (registration) => {
        return registration.eventId === this.event.id;
      });
    }
  },
  methods: {
    subcost (property) {
      if (!property) {
        return 0;
      }

      return _.reduce(this.selectedRegistration.registrations, (sum, registration) => {
        return sum += _.reduce(registration[property], (subsum, property) => {
          return subsum += Number(property.price) * (Number(property.details.quantity) || 1);
        }, 0);
      }, 0);
    }
  },
  mounted () {
    this.$store.dispatch('getRegistrations', this.event.id)
      .then(() => {
        this.loading = false;
        this.error = '';

        if (this.selectedRegistration.registrations.length > 0) {
          return axios.get(URLS.USERS_URL + this.profile.id + '/events/' + this.event.id + '/cost')
            .then((response) => {
              this.totalDue = response.data.cost;
              this.error = '';
            });
        }
      })
      .catch(() => {
        this.loading = false;
        this.error = 'Failed to get the necessary information for statistics.';
      })
  }
}
</script>