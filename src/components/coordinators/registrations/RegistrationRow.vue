<template>
  <div class="registration-row is-flex-tablet columns is-multiline">
    <b class="column is-2">{{ scout.fullname }}</b>
      <template v-if="registered">
        <div class="column is-2">
          <b>Projected Fee: </b>${{ projectedCost }}
        </div>
      </template>
      <template v-if="!registered">
        <button class="button is-link"
                v-if="isRegistrationOpen && !creating"
                @click="toggleCreate()">
          Register for {{ event.semester + ' ' + event.year }}
        </button>
        <create-registration v-if="creating"
                             :scout="scout"
                             :eventId="eventId"
                             @created="toggleCreate()"></create-registration>
        <p v-if="!isRegistrationOpen">
          Sorry, registration for this event is closed.
        </p>
      </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import moment from 'moment';

import CreateRegistration from './Create.vue';

export default {
  props: {
    scout: {
      type: Object,
      required: true
    },
    eventId: {
      required: true
    }
  },
  data() {
    return {
      creating: false,
      error: ''
    };
  },
  computed: {
    ...mapGetters([
      'allEvents'
    ]),
    event() {
      return _.find(this.allEvents, { 'id': this.eventId });
    },
    isRegistrationOpen() {
      if (this.event) {
        return moment().isBetween(this.event.registration_open,
                                  this.event.registration_close,
                                  null,
                                  '[]');
      }
    },
    projectedCost() {
      return this.event.price;
    },
    registered() {
      return _.find(this.scout.registrations, { 'event_id': this.eventId });
    }
  },
  methods: {
    toggleCreate() {
      this.creating = !this.creating;
    }
  },
  components: {
    'create-registration': CreateRegistration
  }
}
</script>

<style lang="sass" scoped>
  .registration-row {
    padding-top: 1em;
    padding-bottom: 1em;
    border-bottom: 1px lightgray solid;
    align-items: center;
  }
</style>