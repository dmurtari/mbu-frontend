<template>
  <div>
    <closable-error v-if="error"
                    @dismissed="clearError()">{{ error }}</closable-error>
    <spinner-page v-if="loading"></spinner-page>
    <div v-else>
      <span v-if="offering.requirements && offering.requirements.length > 0">
        Requirements are:
        <b>{{ readableRequirements }}</b>
      </span>
      <span v-else>
        Requirements are not available.
      </span>
      <attendees v-for="n in 3"
                 :key="n"
                 :period="n"
                 :requirements="offering.requirements"
                 :offeringId="offeringId"
                 :scouts="scoutsForPeriod(n)"
                 @triggerRefresh="triggerRefresh()"></attendees>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import store from 'store';

import ScoutsForClass from './ScoutsForClass';
import Attendees from './Attendees.vue';

export default {
  data () {
    return {
      loading: false,
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
    event () {
      return _.find(this.allEvents, { id: this.eventId }) || {};
    },
    readableRequirements () {
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
    clearError () {
      this.error = '';
    },
    refreshDetails () {
      let event = this.eventClasses[this.eventId] || {};

      _.forEach(event.classes, (availableClass) => {
        if (availableClass.offering_id === this.offeringId) {
          this.offering = availableClass;
          this.assignees = availableClass.assignees;
          this.badge = availableClass.badge.name;
        }
      });

      this.$emit('title', this.badge + ' (' + this.event.semester + ' ' + this.event.year + ')');
    },
    triggerRefresh () {
      this.loading = true
      this.$store.dispatch('getClasses', this.eventId)
        .then(() => {
          this.refreshDetails()
          this.error = '';
        })
        .catch(() => {
          this.error = 'Unable to load class details.';
        })
        .then(() => {
          this.loading = false;
        });
    }
  },
  created () {
    if (this.eventClasses.length < 1) {
      this.triggerRefresh();
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
  beforeRouteEnter (to, from, next) {
    if (store.getters.eventClasses.length < 1) {
      store.dispatch('getClasses', to.params.eventId)
        .then(() => next())
        .catch(() => next(false));
    } else {
      next();
    }
  }
}
</script>
