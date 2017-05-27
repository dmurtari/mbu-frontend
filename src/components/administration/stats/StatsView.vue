<template>
  <div>
    <h4 class="title is-4">Statistics</h4>
    <p>
      This page summarizes event information.
    </p>
    <div class="notification is-danger"
         v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <div class="box registration-list-filters">
      <div class="columns is-multiline">
        <div class="column is-6 is-4-widescreen">
          <div class="field is-horizontal">
            <div class="field-label is-normal">
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
            <div class="field-label is-normal">
              <label class="label">For&nbsp;Troop:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <span class="input-group select">
                    <select class="input"
                            v-model="troopFilter">
                      <option :value="null">All Troops</option>
                      <option v-for="troop in troops"
                              :value="troop"
                              :key="troop">
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
            <div class="field-label is-normal">
              <label class="label"
                     for="attendance-list-find">By&nbsp;Scout:</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <input class="input"
                         id="attndance-list-find"
                         v-model="search"></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader v-if="loading"
            :color="'lightgray'"
            class="loader-centered"></loader>
    <div v-else>
      <div v-if="filteredRegistrations.length > 0">
        <troop-stats :registrations="filteredRegistrations"
                     :event="event"></troop-stats>
        <registration-table :registrations="filteredRegistrations"
                            :event="event"></registration-table>
      </div>
      <div v-else
           class="notification">
        <p>
          No attendance records match the selected filters. Try selecting a
          different event, or selÎecting another troop.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash'

import TroopStats from '../../stats/TroopStats.vue';
import RegistrationTable from '../../stats/RegistrationTable.vue';

export default {
  data () {
    return {
      error: '',
      loading: false,
      search: '',
      selectedEventId: 0,
      troopFilter: null
    }
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
  methods: {
    pickEvent (eventId) {
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
    TroopStats,
    RegistrationTable
  }
}
</script>

<style lang="scss" scoped>
.registration-list-filters {
  margin-top: 2em;
}
</style>