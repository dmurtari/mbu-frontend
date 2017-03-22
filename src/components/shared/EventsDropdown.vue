<template>
  <span class="select">
    <select id="event-offering-select"
            @change="emitEvent()"
            v-model="selectedEvent">
      <option v-if="showAll"
              :value="null">All Events</option>
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
  props: {
    showAll: {
      type: Boolean,
      default: false
    }
  },
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
    if (this.showAll) {
      this.selectedEvent = null;
    } else {
      this.selectedEvent = this.currentEvent.id;
    }

    this.emitEvent();
  }
}
</script>