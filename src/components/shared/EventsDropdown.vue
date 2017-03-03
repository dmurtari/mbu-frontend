<template>
  <span class="select">
    <select id="event-offering-select"
            @change="emitEvent()"
            v-model="selectedEvent">
      <option v-for="option in readableEvents"
              :key="option.id"
              :value="option.id">
        {{ option.event }}
      </option>
    </select>
  </span>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      loading: true,
      selectedEvent: ''
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
    }
  },
  methods: {
    emitEvent() {
      this.$emit('select', this.selectedEvent);
    }
  },
  mounted() {
    this.$store.dispatch('getEvents')
      .then(() => {
        return this.$store.dispatch('getCurrentEvent');
      })
      .then(() => {
        this.selectedEvent = this.currentEvent.id;
        this.emitEvent();
      })
      .catch(() => {
        if (this.orderedEvents.length > 0) {
          this.loading = false;
          this.$emit('select', this.orderedEvents[0].id);
        } else {
          this.$emit('select', '');
        }
      });
  }
}
</script>