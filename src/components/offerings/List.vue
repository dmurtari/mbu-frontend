<template>
<div>
  <h3>
    Manage Offerings For:
    <events-dropdown @select="selectEvent($event)"></events-dropdown>
  </h3>
  <p>
    Use this page to create, edit, and remove offerings for different events.
  </p>
  <table class="table table-striped">
    <tbody>
    <badge-row v-for="badge in badgeIdsAndNames"
               :badge="badge"></badge-row>
    </tbody> 
  </table>
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
      console.log('existing are', existingOfferings)

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