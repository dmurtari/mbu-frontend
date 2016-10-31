<template>
  <div class="container">
    <div>
      <h3>All Events ({{ totalEvents }} total)
        <button class="btn btn-default"
                @click="toggleAdd"
                data-toggle="tooltip" 
                data-placement="right" 
                title="Add an event">
          <span class="glyphicon glyphicon-plus" aria-label="Close"></span>
        </button>
      </h3>
    </div>
    <event-create @close="toggleAdd" v-show="displayAddEvent"></event-create>
    <event v-for="event in events" :event="event"></event>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

import auth from '../../services/auth';
import Event from './Event.vue'
import EventCreate from './Create.vue';

export default {
  data() {
    return {
      user: auth.user,
      profile: auth.getProfile,
      displayAddEvent: false
    }
  },
  computed: {
    ...mapGetters({
      events: 'allEvents'
    }),
    totalEvents() {
      return this.events.length;
    },
    sortedEvents() {
      return _.orderBy(this.events, 'date', 'desc');
    }
  },
  methods: {
    isAuthorized() {
      return this.profile.role === 'admin'
    },
    toggleAdd() {
      this.displayAddEvent = !this.displayAddEvent
    }
  },
  components: {
    'event': Event,
    'event-create': EventCreate
  },
  mounted() {
    this.$store.dispatch('getEvents');
  }
}
</script>