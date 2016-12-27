<template>
<div>
  <h3>
    Manage Badges Offered For:
    <events-dropdown @select="selectEvent($event)"></events-dropdown>
  </h3>
  <p>
    Use this page to create, edit, and remove badge offerings for different events.
    These badges are what Scoutmasters will see as being offered for an event.
    Add badges and edit details such which periods each badge will be offered,
    how many class periods each badge will take to teach, and how much scouts 
    need to pay to attend class for a badge.
  </p>
  <div class="well offering-list-filters">
    <div class="row">
      <div class="col-sm-6 form-inline">
        <div class="form-group">
          <label for="offering-list-offered-filter">Filter by:</label>
          <select class="form-control" 
                  id="offering-list-offered-filter"
                  v-model="offeredFilter">
            <option v-for="option in offeredFilters" :value="option.value">
              {{ option.text }}
            </option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <div class="offering-list">
    <badge-row v-for="badge in filteredOfferings"
               :eventId="selectedEvent.id"
               :badge="badge"></badge-row>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

import BadgeRow from './BadgeRow.vue';
import EventsDropdown from './EventsDropdown.vue';

export default {
  data() {
    return {
      selectedEvent: {},
      offerings: [],
      offeredFilter: 'all',
      offeredFilters: [
        { text: 'All', value: 'all' },
        { text: 'Badges offered at this event', value: 'offered' },
        { text: 'Badge not offered at this event', value: 'unoffered'}
      ]
    };
  },
  computed: {
    ...mapGetters([
      'badgeIdsAndNames'
    ]),
    filteredOfferings() {
      if (this.offeredFilter === 'offered') {
        return _.filter(this.offerings, (offering) => {
          return !_.isEmpty(offering.periods);
        });
      } else if (this.offeredFilter === 'unoffered') {
        return _.filter(this.offerings, (offering) => {
          return _.isEmpty(offering.periods);
        });
      } else {
        return this.offerings;
      }
    }
  },
  methods: {
    selectEvent(selectedEvent) {
      this.selectedEvent = selectedEvent;
      
      let existingOfferings = _.map(this.selectedEvent.offerings, 'details');
      this.offerings = _.map(this.badgeIdsAndNames, (badge) => {
        let offering = _.find(existingOfferings, { 'badge_id': badge.id }) || {};
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
  mounted() {
    this.$store.dispatch('getBadges').catch(() => {
      this.error = 'Couldn\'t load badges. Please try again';
    });
  },
  components: {
    'badge-row': BadgeRow,
    'events-dropdown': EventsDropdown
  }
}
</script>

<style lang="sass">
.offering-list-filters {
  margin-top: 2em;
}
</style>