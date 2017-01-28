<template>
  <div>
    <h4 class="title is-4">
      Manage Merit Badge Offerings
    </h4>
    <p>
      Use this page to create, edit, and remove badge offerings for different events.
      These badges are what Scoutmasters will see as being offered for an event.
      Add badges and edit details such which periods each badge will be offered,
      how many class periods each badge will take to teach, and how much scouts
      need to pay to attend class for a badge.
    </p>
    <div class="notification is-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <div class="box offering-list-filters">
      <div class="columns">
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">For&nbsp;Event:</label>
            </div>
            <div class="control">
              <events-dropdown @select="updateOfferings($event)"></events-dropdown>
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label" for="offering-list-offered-filter">Filter&nbsp;by:</label>
            </div>
            <div class="control">
              <span class="select">
                <select class="form-control"
                        id="offering-list-offered-filter"
                        v-model="offeredFilter">
                  <option v-for="option in offeredFilters" :value="option.value">
                    {{ option.text }}
                  </option>
                </select>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <loader v-if="loading" :color="'lightgray'" class="offering-loading"></loader>
    <div class="offering-list"
         v-if="!loading">
      <badge-row v-for="badge in filteredOfferings"
                :eventId="eventId"
                :badge="badge"></badge-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import BadgeRow from './BadgeRow.vue';
import EventsDropdown from '../../shared/EventsDropdown.vue';

export default {
  data() {
    return {
      eventId: '',
      offeringsList: [],
      offeredFilter: 'all',
      offeredFilters: [
        { text: 'All', value: 'all' },
        { text: 'Offered badges', value: 'offered' },
        { text: 'Unoffered badges', value: 'unoffered'}
      ],
      error: '',
      loading: false
    };
  },
  computed: {
    ...mapGetters([
      'badgeIdsAndNames',
      'offerings'
    ]),
    filteredOfferings() {
      if (this.offeredFilter === 'offered') {
        return _.filter(this.offeringList, (offering) => {
          return !_.isEmpty(offering.periods);
        });
      } else if (this.offeredFilter === 'unoffered') {
        return _.filter(this.offeringList, (offering) => {
          return _.isEmpty(offering.periods);
        });
      } else {
        return this.offeringList;
      }
    },
    offeringList() {
      return _.map(this.badgeIdsAndNames, (badge) => {
        let offering = _.find(this.offerings, { 'badge_id': badge.id }) || {};
        return {
          badge_id: badge.id,
          name: badge.name,
          periods: offering.periods,
          duration: offering.duration,
          price: offering.price
        };
      });
    }
  },
  methods: {
    updateOfferings(selectedEventId) {
      this.loading = true;
      this.eventId = selectedEventId;
      this.$store.dispatch('getOfferings', selectedEventId)
        .then(() => {
          this.error = '';
          this.loading = false;
        })
        .catch(() => {
          this.error = 'Couldn\'t load offerings. Please try refreshing'
          this.loading = false;
        });
    }
  },
  mounted() {
    this.loading = true;
    this.$store.dispatch('getBadges')
      .then(() => {
        this.error = '';
        // this.loading = false;
      })
      .catch(() => {
        this.error = 'Couldn\'t load badges. Please try again'
        this.loading = false;
      });
  },
  components: {
    'badge-row': BadgeRow,
    'events-dropdown': EventsDropdown
  }
}
</script>

<style lang="sass" scoped>
  .offering-list-filters {
    margin-top: 2em;
  }

  .offering-loading {
    margin-top: 5em;
    width: 5em;
    display: block;
    margin: auto;
  }
</style>