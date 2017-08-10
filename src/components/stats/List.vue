<template>
  <div>
    <spinner-page v-if="eventLoading"></spinner-page>
    <div v-else>
      <filter-box :troop.sync="troopFilter"
                  :eventId.sync="eventId"
                  :search.sync="search"
                  :troops="troops"
                  class="attendance-list-filters"></filter-box>
      <closable-error v-if="error"
                      @dismissed="dismissError()">{{ error }}</closable-error>
      <spinner-page v-if="loading"></spinner-page>
      <div v-else
           id="printable">
        <div class="attendance-list"
             v-if="filteredRegistrations.length > 0">
          <div class="box stats-container">
            <h5 class="title is-5">
              Event Overview for {{ event.semester }} {{ event.year }}
              <div class="is-pulled-right">
                <button class="button print-hidden"
                        v-if="!printing"
                        @click="print()">
                  <span class="icon is-small">
                    <i class="fa fa-print"></i>
                  </span>
                  <span>Print</span>
                </button>
              </div>
            </h5>
            <troop-stats :event="this.event"
                         :registrations="this.filteredRegistrations"></troop-stats>
          </div>
          <div class="tabs is-centered print-hidden">
            <ul>
              <router-link :to="listLink"
                           tag="li">
                <a>List View</a>
              </router-link>
              <router-link :to="detailLink"
                           tag="li">
                <a>Detail View</a>
              </router-link>
            </ul>
          </div>
          <div id="print-break-before">
          </div>
          <router-view :event="this.event"
                       :registrations="this.filteredRegistrations"></router-view>
        </div>
        <div v-else
             class="notification">
          <p>
            No attendance records match the selected filters. Try selecting a different event,
            or searching for another scout.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import EventsUpdate from 'mixins/EventsUpdate';
import TroopStats from './TroopStats.vue';
import FilterBox from 'components/shared/FilterBox.vue';

export default {
  props: {
    listLink: {
      type: String,
      required: true
    },
    detailLink: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      eventId: 1,
      error: '',
      loading: false,
      search: '',
      troopFilter: null,
      printing: false
    }
  },
  computed: {
    ...mapGetters([
      'allEvents',
      'registrations'
    ]),
    event () {
      return _.find(this.allEvents, { 'id': this.eventId });
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
    selectedRegistration () {
      return _.find(this.registrations, (registrations) => {
        return registrations.eventId === this.eventId;
      });
    }
    ,
    troops () {
      if (!this.selectedRegistration) {
        return [];
      }

      return _.uniq(_.map(this.selectedRegistration.registrations, ('scout.troop')));
    }
  },
  methods: {
    dismissError () {
      this.error = '';
    },
    print () {
      window.print();
    }
  },
  watch: {
    eventId () {
      this.loading = true;
      this.totalDue = null;

      this.$store.dispatch('getRegistrations', this.eventId)
        .then(() => {
          this.loading = false;
          this.error = '';
        })
        .catch(() => {
          this.loading = false;
          this.error = 'Failed to get registration information for this event';
        });
    }
  },
  components: {
    FilterBox,
    TroopStats
  },
  mixins: [
    EventsUpdate
  ]
}
</script>

<style lang="scss" scoped>
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

#print-break-before {
  break-before: always !important;
}
</style>
