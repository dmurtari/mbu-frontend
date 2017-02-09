<template>
  <div class="registration-row is-flex-tablet columns is-multiline">
    <template v-if="state === 'displaying'">
      <b class="column is-2">{{ scout.fullname }}</b>
      <loader v-if="loading" :color="'lightgray'"></loader>
      <template v-if="registration && !loading">
        <div class="column auto">
          <p>
            <b>Projected Fee: </b>${{ projectedCost }}
          </p>
          <p>
            <b>Badge Preferences: </b>{{ preferences }}
          </p>
        </div>
        <div class="column is-1">
          <button class="button"
                  @click="toggleState('editing')"
                  @cancel="toggleState()">
            <span class="fa fa-edit" aria-label="Modify"></span>
          </button>
        </div>
      </template>
      <template v-if="!registration">
        <button class="button is-link"
                v-if="isRegistrationOpen"
                @click="toggleState('creating')">
          Register for {{ event.semester + ' ' + event.year }}
        </button>
        <p v-if="!isRegistrationOpen">
          Sorry, registration for this event is closed.
        </p>
      </template>
    </template>
    <create-registration v-if="state === 'creating'"
                         :scout="scout"
                         :event="event"
                         @cancel="toggleState()"
                         @created="toggleState()"></create-registration>
    <edit-registration v-if="state === 'editing'"
                       :scout="scout"
                       :registration="registration"
                       @cancel="toggleState()"></edit-registration>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';
import moment from 'moment';

import CreateRegistration from './Create.vue';
import EditRegistration from './Edit.vue';

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
      state: 'displaying',
      loading: false,
      error: ''
    };
  },
  watch: {
    eventId() {
      this.state = 'displaying';
    },
    registration() {
      if (this.registration && this.registration.details) {
        this.loading = true;
        this.$store.dispatch('getPreferences', {
          scoutId: this.scout.id,
          registrationId: this.registration.details.id
        })
          .then(() => {
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
            this.error = 'Failed to load registration details. Please refresh and try again';
          })
      }
    }
  },
  computed: {
    ...mapGetters([
      'allEvents',
      'badgeIdsAndNames'
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
    preferences() {
      return _.join(_.map(this.registration.preferences, (preference) => {
        return _.find(this.badgeIdsAndNames, { id: preference.badge_id }).name;
      }), ', ');
    },
    projectedCost() {
      return this.event.price;
    },
    registration() {
      return _.find(this.scout.registrations, { 'event_id': this.eventId });
    }
  },
  methods: {
    toggleState(state = 'displaying') {
      this.state = state;
    }
  },
  components: {
    'create-registration': CreateRegistration,
    'edit-registration': EditRegistration
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