<template>
  <div>
    <h4 class="title is-4">Troop Registrations</h4>
    <p>
      Use this page to manage event registrations for your troop.
    </p>
    <div class="notification is-danger" v-if="error">
      <button class="delete" @click.prevent="dismissError()"></button>
      <p>{{ error }}</p>
    </div>
    <div class="box registration-list-filters">
      <div class="columns">
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">For&nbsp;Event:</label>
            </div>
            <div class="control">
              <events-dropdown @select="setEvent($event)"></events-dropdown>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label" for="registered-list-filters">Filter&nbsp;by:</label>
            </div>
            <div class="control">
              <span class="select">
                <select class="form-control"
                        id="registered-list-filters"
                        v-model="registrationFilter">
                  <option v-for="option in registrationFilters" :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader v-if="loading" :color="'lightgray'" class="registration-loading"></loader>
    <div class="registration-list"
         v-if="!loading">
      <registration-row v-for="scout in filteredScouts"
                        :eventId="eventId"
                        :scout="scout"></registration-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

import EventsDropdown from '../../shared/EventsDropdown.vue';
import RegistrationRow from './RegistrationRow.vue';

export default {
  data() {
    return {
      error: '',
      eventId: '',
      loading: false,
      registrationFilter: 'all',
      registrationFilters: [
        { text: 'All', value: 'all' },
        { text: 'Registered For Event', value: 'registered' },
        { text: 'Not Registered For Event', value: 'unregistered' }
      ]
    };
  },
  computed: {
    ...mapGetters([
      'profile',
      'scouts'
    ]),
    filteredScouts() {
      if (this.registrationFilter === 'registered') {
        return _.filter(this.scouts, (scout) => {
          return _.find(scout.registrations, { 'event_id': this.eventId });
        });
      } else if (this.registrationFilter === 'unregistered') {
        return _.filter(this.scouts, (scout) => {
          return !_.find(scout.registrations, { 'event_id': this.eventId });
        });
      } else {
        return this.scouts;
      }
    }
  },
  methods: {
    dismissError() {
      this.error = '';
    },
    setEvent(eventId) {
      this.eventId = eventId;
    }
  },
  components: {
    'events-dropdown': EventsDropdown,
    'registration-row': RegistrationRow
  }
}
</script>

<style lang="sass" scoped>
  .registration-list-filters {
    margin-top: 2em;
  }

  .registration-loading {
    margin-top: 5em;
    width: 5em;
    display: block;
    margin: auto;
  }
</style>