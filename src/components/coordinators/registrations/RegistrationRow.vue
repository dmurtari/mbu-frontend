<template>
  <div class="registration-row ">
    <div class="notification is-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <div class="is-flex-tablet columns is-multiline">
      <template v-if="state === 'displaying'">
        <b class="column is-2 is-hidden-mobile">{{ scout.fullname }}</b>
        <h5 class="column is-2 title is-5 is-hidden-tablet">{{ scout.fullname }}</h5>
        <loader v-if="loading" :color="'lightgray'"></loader>
        <registration-detail class="column auto"
                             v-if="registration && !loading"
                             :scout="scout"
                             :registration="registration"
                             :event="event"
                             @edit="toggleState('editing')"></registration-detail>
        <template v-if="!registration">
          <button class="button is-link register-button"
                  v-if="registrationOpen"
                  @click="toggleState('creating')">
            Register for {{ event.semester + ' ' + event.year }}
          </button>
          <span class="column auto" v-if="!registrationOpen">
            Sorry, registration for this event is closed.
          </span>
        </template>
      </template>
      <create-registration v-if="state === 'creating'"
                          :scout="scout"
                          :event="event"
                          @cancel="toggleState()"
                          @created="toggleState('purchasing')"></create-registration>
      <edit-registration v-if="state === 'editing'"
                        :scout="scout"
                        :event="event"
                        :registration="registration"
                        @cancel="toggleState()"
                        @saved="toggleState()"></edit-registration>
      <template v-if="state === 'purchasing'">
        <purchases :event="event"
                   :purchasables="event.purchasables"
                   :existingPurchases="registration.purchases"
                   :scoutId="scout.id"
                   :registrationId="registration.details.id"></purchases>
        <button class="button is-primary done-purchasing-button"
                @click="toggleState()">Done</button>
      </template>

    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

import CreateRegistration from './Create.vue';
import EditRegistration from './Edit.vue';
import Purchases from './Purchases.vue';
import RegistrationDetail from '../../scouts/RegistrationDetail.vue'

export default {
  props: {
    scout: {
      type: Object,
      required: true
    },
    event: {
      type: Object,
      required: true
    },
    registrationOpen: {
      type: Boolean,
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
    event() {
      this.state = 'displaying';
    },
    registration() {
      if (this.registration && this.registration.details) {
        this.loading = true;
        Promise.all([
          this.$store.dispatch('getPreferences', {
            scoutId: this.scout.id,
            registrationId: this.registration.details.id
          }),
          this.$store.dispatch('getPurchases', {
            scoutId: this.scout.id,
            registrationId: this.registration.details.id
          }),
        ])
          .then(() => {
            this.error = '';
            this.loading = false;
          })
          .catch(() => {
            this.loading = false;
            this.error = 'Failed to load registration details. Please refresh and try again';
          })
      } else {
        this.state = 'displaying';
      }
    }
  },
  computed: {
    registration() {
      return _.find(this.scout.registrations, { 'event_id': this.event.id });
    }
  },
  methods: {
    toggleState(state = 'displaying') {
      this.state = state;
    }
  },
  components: {
    'create-registration': CreateRegistration,
    'edit-registration': EditRegistration,
    Purchases,
    RegistrationDetail
  }
}
</script>

<style lang="sass" scoped>
  .registration-row {
    padding: 2rem 1rem;
    border-bottom: 1px lightgray solid;
    align-items: center;
  }

  .register-button {
    height: auto;
  }

  .done-purchasing-button {
    margin-top: 1em;
  }
</style>