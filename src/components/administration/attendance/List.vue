<template>
  <div>
    <h4 class="title is-4">Manage Class Assignments</h4>
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
      <div class="columns is-multiline">
        <div class="column is-6 is-4-widescreen">
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">For&nbsp;Event:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <events-dropdown @select="pickEvent($event)"></events-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6 is-4-widescreen">
          <div class="field is-horizontal">
            <div class="field-label">
              <label class="label">For&nbsp;Troop:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <span class="input-group select">
                    <select class="input"
                            v-model="troopFilter">
                      <option :value="null">All Troops</option>
                      <option v-for="troop in troops" :value="troop" :key="troop">
                        {{ troop }}
                      </option>
                    </select>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-6 is-4-widescreen">
          <div class="search-container field is-horizontal">
            <div class="field-label">
              <label class="label" for="scout-list-find">Name:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input class="input is-expanded"
                        id="scout-list-find"
                        v-model="search"></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader v-if="loading" :color="'lightgray'" class="registrations-loading"></loader>
    <div class="registration-list" v-if="!loading">
      <attendance-row v-for="registration in filteredRegistrations"
                      :key="registration.id"
                      :registration="registration"
                      :event="event"></attendance-row>
      <div class="notification" v-if="noRegistrations">
        No scouts are currently registered for this event.
      </div>
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
    event() {
      return _.find(this.allEvents, { 'id': this.selectedEventId });
    },
    filteredRegistrations() {
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
    noRegistrations() {
      return !this.selectedRegistration || this.selectedRegistration.registrations.length < 1;
    },
    selectedRegistration() {
      return _.find(this.registrations, (registrations) => {
        return registrations.eventId === this.selectedEventId;
      });
    },
    troops() {
      if (!this.selectedRegistration) {
        return [];
      }

      return _.uniq(_.map(this.selectedRegistration.registrations, ('scout.troop')));
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