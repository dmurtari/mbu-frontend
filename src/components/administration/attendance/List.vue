<template>
  <div>
    <h4 class="title is-4">Manage Event Registrations</h4>
    <p>
      Use this page to manage scouts that are attending an event. You can view
      merit badges that scouts have requested, and assign scouts to merit badges.
    </p>
    <div class="notification is-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <div class="box registration-list-filters">
      <div class="columns">
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">For&nbsp;Event:</label>
            </div>
            <div class="control">
              <events-dropdown @select="pickEvent($event)"></events-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader v-if="loading" :color="'lightgray'" class="registrations-loading"></loader>
    <div class="registration-list">
    <attendance-row v-for="registration in filteredRegistrations"
                    :registration="registration"></attandance-row>
    </div>
  </div>
</template>

<script>
import EventsDropdown from '../../shared/EventsDropdown.vue';
import AttendanceRow from './AttendanceRow.vue';

import { mapGetters } from 'vuex';
import _ from 'lodash'

export default {
  data() {
    return {
      error: '',
      loading: false,
      selectedEventId: 0
    };
  },
  computed: {
    ...mapGetters([
      'registrations'
    ]),
    selectedRegistration() {
      return _.find(this.registrations, (registrations) => {
        return registrations.eventId === this.selectedEventId;
      });
    },
    filteredRegistrations() {
      if (!this.selectedRegistration) {
        return {};
      }

      return this.selectedRegistration.registrations;
    }
  },
  methods: {
    pickEvent(eventId) {
      this.selectedEventId = eventId;
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
    EventsDropdown,
    AttendanceRow
  }
}
</script>

<style lang="sass" scoped>
  .registration-list-filters {
    margin-top: 2em;
  }

  .registrations-loading {
    margin-top: 5em;
    width: 5em;
    display: block;
    margin: auto;
  }

  .registration-list {
    margin-top: 2em;
  }
</style>