<template>
  <div>
    <h4 class="title is-4">Manage Class Assignments</h4>
    <p>
      Use this page to manage scouts that are attending an event. You can view merit badges
      that scouts have requested, and assign scouts to merit badges.
    </p>
    <closable-error v-if="eventLoadError"></closable-error>
    <spinner-page v-if="eventLoading"></spinner-page>
    <div v-else>
      <filter-box :troop.sync="troopFilter"
                  :eventId.sync="selectedEventId"
                  :search.sync="search"
                  :troops="troops"
                  class="scout-list-filters"></filter-box>
      <spinner-page v-if="loading"></spinner-page>
      <div class="registration-list"
           v-else>
        <closable-error v-if="error">{{ error }}</closable-error>
        <div v-if="filteredRegistrations.length > 0">
          <attendance-row v-for="registration in filteredRegistrations"
                          :key="registration.id"
                          :registration="registration"
                          :event="event"></attendance-row>
        </div>
        <div class="notification"
             v-else>
          <p>
            There are no scouts that match the criteria you specified.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AttendanceRow from './AttendanceRow.vue';
import FilterBox from 'components/shared/FilterBox.vue';
import EventsUpdate from 'mixins/EventsUpdate';

import { mapGetters } from 'vuex';
import _ from 'lodash'

export default {
  data () {
    return {
      error: '',
      loading: false,
      search: '',
      selectedEventId: 0,
      troopFilter: null
    };
  },
  computed: {
    ...mapGetters([
      'registrations',
      'allEvents'
    ]),
    event () {
      return _.find(this.allEvents, { 'id': this.selectedEventId });
    },
    filteredRegistrations () {
      if (!this.selectedRegistration) {
        return {};
      }

      let registrations;

      if (!this.troopFilter) {
        registrations = this.selectedRegistration.registrations;
      } else {
        registrations = _.filter(this.selectedRegistration.registrations, (registration) => {
          return registration.scout.troop === this.troopFilter;
        });
      }

      return _.filter(registrations, (registration) => {
        return registration.scout.fullname.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
      });
    },
    noRegistrations () {
      return !this.selectedRegistration || this.selectedRegistration.registrations.length < 1;
    },
    selectedRegistration () {
      return _.find(this.registrations, (registrations) => {
        return registrations.eventId === this.selectedEventId;
      });
    },
    troops () {
      if (!this.selectedRegistration) {
        return [];
      }

      return _.uniq(_.map(this.selectedRegistration.registrations, ('scout.troop')));
    }
  },
  watch: {
    selectedEventId (eventId) {
      this.loading = true;
      this.troopFilter = null;
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
    FilterBox,
    AttendanceRow
  },
  mixins: [
    EventsUpdate
  ]
}
</script>

<style lang="scss" scoped>
.scout-list-filters {
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
