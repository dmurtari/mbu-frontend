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
    <badge-row v-for="badge in badges"
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
      selectedEvent: {}
    };
  },
  computed: {
    ...mapGetters([
      'badges'
    ])
  },
  methods: {
    selectEvent(selectedEvent) {
      this.selectedEvent = selectedEvent;
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