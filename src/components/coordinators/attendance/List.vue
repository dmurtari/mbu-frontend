<template>
  <div>
    <h4 class="title is-4">Event Assignments</h4>
    <div class="notification is-danger" v-if="error">
      <button class="delete" @click.prevent="dismissError()"></button>
      <p>{{ error }}</p>
    </div>
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
    <div class="attendance-list" v-if="!loading">
      <attendance-row v-for="registration in filteredRegistrations"
                      :key="registration.id"
                      :registration="registration"
                      :event="event"></attendance-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import AttendanceRow from './TroopAttendanceRow.vue';
import EventsDropdown from '../../shared/EventsDropdown.vue';

export default {
  data() {
    return {
      eventId: 1,
      error: '',
      loading: false,
      search: ''
    }
  },
  computed: {
    ...mapGetters([
      'allEvents',
      'registrations'
    ]),
    event() {
      return _.find(this.allEvents, { 'id': this.eventId });
    },
    filteredRegistrations() {
      if (!this.selectedRegistration) {
        return {};
      }

      return _.filter(this.selectedRegistration.registrations, (registration) => {
        return registration.scout.fullname.toLowerCase().indexOf(
          this.search.toLowerCase()
        ) > -1;
      });
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
      this.$store.dispatch('getRegistrations', eventId)
        .then(() => {
          this.loading = false;
          this.error = '';
        })
        .catch(() => {
          this.loading = false;
          this.error = 'Failed to get registrations for this event';
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
  .attendance-list-filters {
    margin-top: 2em;
  }

  .attendances-loading {
    margin-top: 5em;
    width: 5em;
    display: block;
    margin: auto;
  }

  .attendance-list {
    margin-top: 2em;
  }
</style>