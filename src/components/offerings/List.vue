<template>
<div>
  <h3>
    Manage Offerings For:
    <events-dropdown @select="selectEvent($event)"></events-dropdown>
  </h3>
  <p>
    Use this page to create, edit, and remove offerings for different events.
  </p>
  <div class="offering-list container">
    <badge-row v-for="badge in offerings"
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
      offerings: []
    };
  },
  computed: {
    ...mapGetters([
      'badgeIdsAndNames'
    ])
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
.offering-list {
  padding-top: 2em;
}
</style>