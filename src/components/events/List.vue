<template>
  <div class="container">
    <div>
      <h3>All Events ({{ totalEvents }} total)
        <button class="btn btn-default"
                @click="toggleAdd">
          <span class="glyphicon glyphicon-plus" aria-label="Close"></span>
        </button>
      </h3>
    </div>
    <create-event @close="toggleAdd" v-show="displayAddEvent"></create-event>
    <event v-for="event in events" v-bind:event="event"></event>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import auth from '../../services/auth';
import CreateEvent from './CreateEvent.vue';
import Event from './Event.vue';

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
    'create-event': CreateEvent,
    'event': Event
  },
  mounted() {
    this.$store.dispatch('getEvents');
  }
}
</script>