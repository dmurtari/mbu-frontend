<template>
<inline-dropdown v-if="!loading"
                 :displayKey="'event'"
                 :objects="readableEvents"
                 :initial="currentEventText"
                 @select="selectEvent($event)"></inline-dropdown>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loading: true
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
      let selectedEvent = _.find(this.orderedEvents, (event) => {
        return event.id === selectedId;
      });

      this.$emit('select', selectedEvent);
    }
  },
  mounted() {
    this.$store.dispatch('getEvents')
      .then(() => {
        return this.$store.dispatch('getCurrentEvent');
      })
      .then(() => {
        this.loading = false;
        this.selectedEvent(this.currentEvent.id);
      })
      .catch(() => {
        if (this.orderedEvents.length > 0) {
          this.loading = false;
          this.$emit('select', this.orderedEvents[0]);
        } else {
          this.$emit('select', {});
        }
      });
  }
}
</script>