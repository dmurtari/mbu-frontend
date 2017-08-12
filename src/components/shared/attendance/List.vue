<template>
  <div>
    <spinner-page v-if="loading"></spinner-page>
    <div class="registration-list"
         v-else>
      <closable-error v-if="error">{{ error }}</closable-error>
      <div v-if="registrations.length > 0">
        <attendance-row v-for="registration in registrations"
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
</template>

<script>
import AttendanceRow from './AttendanceRow.vue';
import EventsUpdate from 'mixins/EventsUpdate';

import { mapGetters } from 'vuex';
import _ from 'lodash'

export default {
  props: {
    event: {
      type: Object
    },
    registrations: {
      type: Array,
      required: true
    }
  },
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
    noRegistrations () {
      return !this.selectedRegistration || this.selectedRegistration.registrations.length < 1;
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
    AttendanceRow
  },
  mixins: [
    EventsUpdate
  ]
}
</script>

<style lang="scss" scoped>
.registration-list {
  margin-top: 2em;
}
</style>
