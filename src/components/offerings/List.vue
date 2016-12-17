<template>
<div>
  <h3>
    Manage Offerings For:
    <inline-dropdown v-if="!loading"
                     :displayKey="'event'"
                     :objects="readableEvents"
                     :initial="currentEventText"
                     @select="selectEvent($event)"></inline-dropdown>
  </h3>
  <div class="alert alert-danger" v-if="error">
    <p>
      {{ error }}
    </p>
  </div>
  <div class="alert alert-warning" v-if="warn">
    <p>
      {{ warn }}
    </p>
  </div>
  <p>
    Use this page to create, edit, and remove offerings for different events.
  </p>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loading: true,
      selectedEvent: {},
      error: '',
      warn: ''
    };
  },
  computed: {
    ...mapGetters([
      'orderedEvents',
      'currentEvent'
    ]),
    readableEvents() {
      return _.map(this.orderedEvents, (event) => {
        return { 
          id: event.id,
          event: event.semester + ' ' + event.year 
        };
      });
    },
    currentEventText() {
      if (!this.currentEvent.id) {
        return undefined;
      }

      return {
        id: this.currentEvent.id,
        event: this.currentEvent.semester + ' ' + this.currentEvent.year
      };
    }
  },
  methods: {
    selectEvent(selectedId) {
      this.selectedEvent = _.find(this.orderedEvents, (event) => {
        return event.id === selectedId;
      });

      this.error = '';
      this.warn = '';
    }
  },
  mounted() {
    this.$store.dispatch('getEvents').then(() => {
      return this.selectedEvent = this.orderedEvents[0];
    })
    .then(() => {
      return this.$store.dispatch('getCurrentEvent');
    })
    .then(() => {
      this.loading = false;
      this.selectedEvent = this.currentEvent;
    })
    .catch(() => {
      if (this.orderedEvents.length > 0) {
        this.loading = false;
        this.warn = 'Couldn\'t find the current event. Is one set?';
        this.selectedEvent = this.orderedEvents[0];
      } else {
        this.selectedEvent = {};
        this.error = 'Couldn\'t load events. Please try again.';
      }
    })
  }
}
</script>