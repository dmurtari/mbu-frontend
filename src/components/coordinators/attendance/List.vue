<template>
  <div>
    <h4 class="title is-4">Class Assignments</h4>
    <div class="notification is-danger" v-if="error">
      <button class="delete" @click.prevent="dismissError()"></button>
      <p>{{ error }}</p>
    </div>
    <div class="box registration-list-filters">
      <div class="columns">
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">For&nbsp;Event:</label>
            </div>
            <div class="control">
              <events-dropdown @select="setEvent($event)"></events-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import EventsDropdown from '../../shared/EventsDropdown.vue';

export default {
  data() {
    return {
      eventId: 1,
      error: '',
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'allEvents',
      'registrations'
    ]),
    event() {
      return _.find(this.allEvents, { 'id': this.eventId });
    },
  },
  methods: {
    dismissError() {
      this.error = '';
    },
    setEvent(eventId) {
      this.eventId = eventId;
    }
  },
  components: {
    EventsDropdown
  }
}
</script>