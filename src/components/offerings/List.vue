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
      error: ''
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
    }
  },
  mounted() {
    this.$store.dispatch('getEvents').then(() => {
      this.selectedEvent = this.orderedEvents[0];
    })
    .then(() => {
      this.$store.dispatch('getCurrentEvent');
    })
    .then(() => {
      this.loading = false;
      this.selectedEvent = this.currentEvent;
    })
    .catch(() => {
      this.loading = false;
      this.err = 'Couldn\'t load events. Please try again.';
    })
  }
}
</script>