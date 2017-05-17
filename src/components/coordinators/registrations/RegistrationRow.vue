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
        <template v-if="registration && !loading">
          <div class="column auto">
            <scout-registration :event="event"
                                :preferences="preferences"
                                :purchases="purchases"
                                :showActualCost="false"
                                :showAssignments="false"></scout-registration>
          </div>
          <div class="column is-1">
            <button class="button"
                    @click="toggleState('editing')"
                    @cancel="toggleState()"
                    data-balloon="Modify Registration"
                    :disabled="!registrationOpen">
              <span class="fa fa-edit is-hidden-mobile" aria-label="Modify"></span>
              <span class="is-hidden-tablet">Modify Registration</span>
            </button>
          </div>
        </template>
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
import ScoutRegistration from '../../scouts/ScoutRegistration.vue';

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
    offerings() {
      return this.event.offerings;
    },
    preferences() {
      return _.map(this.registration.preferences, (preference) => {
        let offering = _.find(this.offerings, { id: preference.badge_id });
        return {
          name: offering.name,
          price: offering.details.price
        }
      });
    },
    purchases() {
      return _.map(this.registration.purchases, (purchase) => {
        return {
          price: purchase.price,
          size: purchase.details.size,
          item: purchase.item,
          quantity: purchase.details.quantity,
          id: purchase.id
        }
      });
    },
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
    CreateRegistration,
    EditRegistration,
    Purchases,
    ScoutRegistration
  }
}
</script>

<style lang="scss" scoped>
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