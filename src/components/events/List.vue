<template>
  <div>
    <slot name="title">
      <h3 class="title is-3">
        All Events ({{ totalEvents }} Total)
      </h3>
    </slot>
    <button class="button is-primary"
            v-if="isAdmin && !displayAddEvent"
            @click="toggleAdd()">
      Add an Event
    </button>
    <event-create @close="toggleAdd()" v-show="displayAddEvent"></event-create>
    <div class="event-list">
      <event v-for="event in orderedEvents"
            :event="event"
            :key="event.id"
            :currentEvent="event.id === currentEvent.id"></event>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Event from './Event.vue'
import EventCreate from './Create.vue';

export default {
  data() {
    return {
      displayAddEvent: false
    }
  },
  computed: {
    ...mapGetters([
      'orderedEvents',
      'currentEvent',
      'isAdmin'
    ]),
    totalEvents() {
      return this.orderedEvents.length;
    }
  },
  methods: {
    isAuthorized() {
      return this.profile.role === 'admin'
    },
    toggleAdd() {
      this.displayAddEvent = !this.displayAddEvent;
    }
  },
  components: {
    'event': Event,
    'event-create': EventCreate
  },
  mounted() {
    this.$store.dispatch('getEvents');
    this.$store.dispatch('getCurrentEvent');
  }
}
</script>

<style lang="sass">
.event-list {
  margin-top: 2em;
}
</style>