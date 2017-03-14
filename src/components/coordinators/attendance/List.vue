<template>
  <div>
    <h4 class="title is-4">Event Attendances</h4>
    <p>
      This page contains information regarding your troop's attendance for MBU
      events such as class assignments and purchases for individual scouts,
      and total amount due for each scout as well as your troop
    </p>
    <div class="box attendance-list-filters">
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
          <div class="search-container control is-horizontal">
            <div class="control-label">
              <label class="label" for="attendance-list-find">By&nbsp;Scout:</label>
            </div>
            <div class="control">
              <input class="input"
                     id="attndance-list-find"
                     v-model="search"></input>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader v-if="loading" :color="'lightgray'" class="attendance-loading"></loader>
    <div v-else>
      <div class="notification is-danger" v-if="error">
        <button class="delete" @click.prevent="dismissError()"></button>
        <p>{{ error }}</p>
      </div>
      <div class="attendance-list" v-if="filteredRegistrations.length > 0">
        <div class="box">
          <h5 class="title is-5">
            Event Overview for {{ event.semester }} {{ event.year }}
          </h5>
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
        <attendance-row v-for="registration in filteredRegistrations"
                        :key="registration.id"
                        :registration="registration"
                        :event="event"></attendance-row>
      </div>
      <div v-else class="notification">
        <p>
          No attendance records match the selected filters. Try selecting a
          different event, or searching for another scout.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import URLS from 'urls';

import AttendanceRow from './TroopAttendanceRow.vue';
import EventsDropdown from '../../shared/EventsDropdown.vue';

export default {
  data() {
    return {
      eventId: 1,
      error: '',
      loading: false,
      search: '',
      totalDue: null
    }
  },
  computed: {
    ...mapGetters([
      'allEvents',
      'profile',
      'registrations'
    ]),
    event() {
      return _.find(this.allEvents, { 'id': this.eventId });
    },
    filteredRegistrations() {
      if (!this.selectedRegistration) {
        return {};
      }

      return _.orderBy(_.filter(this.selectedRegistration.registrations, (registration) => {
        return registration.scout.fullname.toLowerCase().indexOf(
          this.search.toLowerCase()
        ) > -1;
      }), 'scout.lastname');
    },
    selectedRegistration() {
      return _.find(this.registrations, (registrations) => {
        return registrations.eventId === this.eventId;
      });
    }
  },
  methods: {
    dismissError() {
      this.error = '';
    },
    setEvent(eventId) {
      this.eventId = eventId;
      this.loading = true;
      this.totalDue = null;

      this.$store.dispatch('getRegistrations', eventId)
        .then(() => {
          this.loading = false;
          this.error = '';

          if (this.selectedRegistration.registrations.length > 0) {
            return axios.get(URLS.USERS_URL + this.profile.id + '/events/' + eventId + '/cost')
              .then((response) => {
                this.totalDue = response.data.cost;
                this.error = '';
              });
          }
        })
        .catch(() => {
          this.loading = false;
          this.error = 'Failed to get registration information for this event';
        });
    }
  },
  components: {
    AttendanceRow,
    EventsDropdown
  }
}
</script>

<style lang="sass" scoped>
  .notification {
    margin-top: 1rem;
  }

  .attendance-list-filters {
    margin-top: 2em;
  }

  .attendances-loading {
    margin-top: 5em;
    width: 5em;
    display: block;
    margin: auto;
  }
</style>