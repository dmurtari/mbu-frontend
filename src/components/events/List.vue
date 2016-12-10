<template>
  <div class="container-fluid">
    <div>
      <h3>All Events ({{ totalEvents }} total)
        <button class="btn btn-default"
                v-if="isAdmin"
                @click="toggleAdd"
                data-toggle="tooltip" 
                data-placement="right" 
                title="Toggle event creation panel">
          <span v-if="!displayAddEvent" 
                class="glyphicon glyphicon-plus"></span>
          <span v-if="displayAddEvent" 
                class="glyphicon glyphicon-minus"></span>
        </button>
      </h3>
    </div>
    <event-create @close="toggleAdd" v-show="displayAddEvent"></event-create>
    <div class="event-list">
      <event v-for="event in orderedEvents" :event="event"></event>
    </div
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
  }
}
</script>

<style lang="sass">
.event-list {
  margin-top: 2em;
}
</style>