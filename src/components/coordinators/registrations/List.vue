<template>
  <div>
    <h4 class="title is-4">Event Registrations</h4>
    <p>
      Use this page to manage event registrations for your troop. You can specify
      which Merit Badges scouts would like to learn at the current MBU, and
      view their preferences from previous MBUs.
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
                        :disabled="!isCurrentEvent"
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
      <div class="notification" v-if="!isCurrentEvent">
        <p>
          The event you have selected is not the current MBU. You can view
          registration information for scouts that were registered for the
          {{ readableEvent }} event, but you can not add or modify registrations.
        </p>
      </div>
      <div class="notification" v-if="filteredScouts.length < 1">
        <p>
          No registrations exist for scouts from your troop for {{ readableEvent }}.
        </p>
      </div>
      <div class="notification" v-if="isCurrentEvent">
        You can register scouts for the {{ readableEvent }} MBU and modify
        existing registrations during the time period that registration is open
        ({{ event.registration_open | shortDate}} - {{ event.registration_close | shortDate}}).
        <b>Additions and modifications to registrations cannot be made outside
        of these dates</b> so be sure to make any changes before registration
        closes.
      </div>
      <registration-row v-for="scout in filteredScouts"
                        :key="scout.id"
                        :event="event"
                        :registrationOpen="registrationOpen"
                        :eventId="eventId"
                        :scout="scout"></registration-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import moment from 'moment';

import EventsDropdown from '../../shared/EventsDropdown.vue';
import RegistrationRow from './RegistrationRow.vue';

export default {
  data() {
    return {
      error: '',
      eventId: 1,
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
      'allEvents',
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
    },
    event() {
      return _.find(this.allEvents, { 'id': this.eventId });
    },
    isCurrentEvent() {
      return this.$store.getters.isCurrentEvent(this.eventId);
    },
    readableEvent() {
      return this.event.semester + ' ' + this.event.year;
    },
    registrationOpen() {
      if (this.event) {
        return moment().isBetween(this.event.registration_open,
          this.event.registration_close,
          null,
          '[]');
      }
    }
  },
  methods: {
    dismissError() {
      this.error = '';
    },
    setEvent(eventId) {
      this.eventId = eventId;
      if (!this.isCurrentEvent) {
        this.registrationFilter = 'registered';
      } else {
        this.registrationFilter = 'all';
      }
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