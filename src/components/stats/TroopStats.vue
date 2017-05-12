<template>
  <div>
    <ul>
      <li>
        <b>Total Attendance: </b>{{ selectedRegistration.registrations.length }} scouts
      </li>
      <li>
        <b>Total Due: </b>
        <span v-if="totalDue">{{ totalDue | currency }}</span>
        <span v-else>Calculating...</span>
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