<template>
  <div>
    <div v-if="!loading">
      <div class="section">
        <h3 class="title is-3">{{ scout.fullname }}</h3>
        <h5 class="subtitle is-5"> Troop {{ scout.troop }}</h5>
      </div>
      <div class="section columns">
        <div class="column is-6">
          <h5 class="title is-5">Scout Information</h5>
          <ul>
            <li><b>First Name: </b>{{ scout.firstname }}</li>
            <li><b>Last Name: </b>{{ scout.lastname }}</li>
            <li><b>Birthday: </b>{{ scout.birthday | shortDate }}</li>
            <li><b>Age: </b>{{ scout.age }}</li>
            <li><b>Date Added: </b>{{ scout.created_at | shortDate }}</li>
            <li><b>Notes: </b>{{ scout.notes }}</li>
          </ul>
        </div>
        <div class="column is-6"
             v-if="scout.user">
          <h5 class="title is-5">Coordinator Information</h5>
          <ul>
            <li><b>Name: </b>{{ scout.user.fullname }}</li>
            <li><b>Email: </b>{{ scout.user.email }}</li>
            <li><b>Council: </b>{{ scout.user.details.council }}</li>
            <li><b>District: </b>{{ scout.user.details.district }}</li>
            <li><b>Troop: </b>{{ scout.user.details.troop }}</li>
          </ul>
        </div>
      </div>
      <div class="section">
        <h5 class="title is-5">Registration Information</h5>
        <div v-if="registrations.length > 0">
          <registration-container v-for="registration in orderedRegistrations"
                                  :scout="scout"
                                  :key="registration.id"
                                  :event="eventForId(registration.event_id)"
                                  :registration="registration"
                                  class="registration">
          </registration-container>
        </div>
        <div v-else
             class="notification">
          This scout has not registered for any events.
        </div>
      </div>
    </div>
    <div v-else>
      <loader v-if="loading"
              :color="'lightgray'"
              class="scout-details-loading"></loader>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import { mapGetters } from 'vuex';

import URLS from 'urls';
import RegistrationContainer from './RegistrationContainer.vue';

export default {
  data() {
    return {
      loading: false,
      error: '',
      scout: {},
      registrations: {}
    };
  },
  computed: {
    ...mapGetters([
      'allEvents'
    ]),
    orderedRegistrations() {
      return _.orderBy(this.registrations, 'created_at');
    }
  },
  mounted() {
    this.loading = true;
    axios.get(URLS.SCOUTS_URL + this.$route.params.id)
      .then((response) => {
        this.scout = response.data;
        return axios.get(URLS.SCOUTS_URL + this.$route.params.id + '/registrations')
      })
      .then((response) => {
        this.loading = false;
        this.registrations = response.data;
        this.error = '';
      })
      .catch(() => {
        this.loading = false;
        this.error = 'Failed to get registrations for this scout.';
      });
  },
  methods: {
    eventForId(eventId) {
      return _.find(this.allEvents, { 'id': eventId });
    }
  },
  watch: {
    $route() {
      this.loading = true;
      axios.get(URLS.SCOUTS_URL + this.$route.params.id)
        .then((response) => {
          this.scout = response.data;
          return axios.get(URLS.SCOUTS_URL + this.$route.params.id + '/registrations')
        })
        .then((response) => {
          this.loading = false;
          this.registrations = response.data;
          this.error = '';
        })
        .catch(() => {
          this.loading = false;
          this.error = 'Failed to get registrations for this scout.';
        });
    }
  },
  components: {
    RegistrationContainer
  }
}
</script>

<style lang="sass" scoped>
  .scout-details-loading {
    display: block;
    margin: auto;
    width: 5rem;
    margin-top: 5rem
  }

  .section {
    padding-top: 2rem;
    padding-bottom: 2rem;
    padding-left: 0rem;
    padding-right: 0rem;
  }

  .registration {
    padding-top: 1rem;
    padding-bottom: 2rem;
  }
</style>