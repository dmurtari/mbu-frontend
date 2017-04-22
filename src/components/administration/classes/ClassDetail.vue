<template>
  <div>
    <div class="notification is-danger" v-if="error">
      <button class="delete" @click="clearError()"></button>
      <p>{{ error }}</p>
    </div>
    <div v-else>
      <span v-if="offering.requirements && offering.requirements.length > 0">
        Requirements are: <b>{{ readableRequirements }}</b>
      </span>
      <span v-else>
        Requirements are not available.
      </span>
      <attendees v-for="n in 3"
                 :key="n"
                 :period="n"
                 :requirements="offering.requirements"
                 :offeringId="offeringId"
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
      error: '',
      offering: {}
    };
  },
  computed: {
    ...mapGetters([
      'allEvents',
      'eventClasses'
    ]),
    event() {
      return _.find(this.allEvents, { id: this.eventId }) || {};
    },
    readableRequirements() {
      return _.join(_.orderBy(this.offering.requirements), ', ');
    }
  },
  props: {
    offeringId: {
      type: Number,
      required: true
    },
    eventId: {
      type: Number,
      required: true
    }
  },
  methods: {
    clearError() {
      this.error = '';
    },
    refreshDetails() {
      let event = _.find(this.eventClasses, { eventId: this.eventId }) || {};
      _.forEach(event.classes, (availableClass) => {
        if (availableClass.offering_id === this.offeringId) {
          this.offering = availableClass;
          this.assignees = availableClass.assignees;
          this.badge = availableClass.badge.name;
        }
      });

      this.$emit('title', this.badge + ' (' + this.event.semester + ' ' + this.event.year + ')');
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
  ],
  beforeRouteEnter(to, from, next) {
    if (store.getters.eventClasses.length < 1) {
      store.dispatch('getClasses', to.params.eventId)
        .then(() => next() )
        .catch(() => next(false) );
    } else {
      next();
    }
  }
}
</script>