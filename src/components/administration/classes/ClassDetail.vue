<template>
  <div>
    <div class="notification is-danger" v-if="error">
      <button class="delete" @click="clearError()"></button>
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <h4 class="title is-4">
        {{ badge }} ({{ event.semester }} {{ event.year }})
      </h4>
      <attendees v-for="n in 3"
                :key="n"
                :period="n"
                :scouts="scoutsForPeriod(n)"></attendees>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from 'store';

import ScoutsForClass from './ScoutsForClass';
import Attendees from './Attendees.vue';

export default {
  data() {
    return {
      badge: '',
      eventId: 0,
      error: ''
    };
  },
  computed: {
    ...mapGetters([
      'allEvents',
      'eventClasses'
    ]),
    event() {
      return _.find(this.allEvents, { id: this.eventId }) || {};
    }
  },
  props: {
    offeringId: {
      type: Number,
      required: true
    }
  },
  methods: {
    clearError() {
      this.error = '';
    },
    refreshDetails() {
      _.forEach(this.eventClasses, (eventClass) => {
        _.forEach(eventClass.classes, (availableClass) => {
          if (availableClass.offering_id === this.offeringId) {
            this.assignees = availableClass.assignees;
            this.badge = availableClass.badge.name;
            this.eventId = eventClass.eventId;
          }
        });
      });
    }
  },
  mounted() {
    if (this.eventClasses.length < 1) {
      this.$store.dispatch('getClasses')
        .then(() => {
          this.refreshDetails()
          this.error = '';
        })
        .catch(() => {
          this.error = 'Unable to load class details.';
        });
    } else {
      this.refreshDetails();
    }

  },
  components: {
    Attendees
  },
  mixins: [
    ScoutsForClass
  ]
}
</script>