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
            <p>
              <b>Projected Fee: </b>{{ projectedCost | currency }}
              <ul class="price-list">
                <li>Event Fee: {{ event.price | currency }}</li>
                <li v-for="preference in preferences" v-if="preference.price !== '0.00'">
                  {{ preference.name }}: {{ preference.price | currency }}
                </li>
              </ul>
            </p>
            <br>
            <p>
              <b>Merit Badge Preferences: </b>
              <ol class="preference-list">
                <li v-for="preference in preferences">
                  {{ preference.name }}
                  <span v-if="preference.price !== '0.00'">
                    ({{ preference.price | currency }})
                  </span>
                </li>
              </ol>
            </p>
          </div>
          <div class="column is-1">
            <button class="button"
                    @click="toggleState('editing')"
                    @cancel="toggleState()"
                    data-balloon="Modify Registration"
                    data-balloon-pos="left"
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
          <p v-if="!registrationOpen">
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
                        :event="event"
                        :registration="registration"
                        @cancel="toggleState()"
                        @saved="toggleState()"></edit-registration>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

import CreateRegistration from './Create.vue';
import EditRegistration from './Edit.vue';

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
        this.$store.dispatch('getPreferences', {
          scoutId: this.scout.id,
          registrationId: this.registration.details.id
        })
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
    projectedCost() {
      return _.reduce(this.preferences, (sum, preference) => {
        return sum + Number(preference.price);
      }, Number(this.event.price));
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
    'create-registration': CreateRegistration,
    'edit-registration': EditRegistration
  }
}
</script>

<style lang="sass" scoped>
  .registration-row {
    padding: 2rem 1rem;
    border-bottom: 1px lightgray solid;
    align-items: center;
  }

  .price-list {
    padding-top: .5rem;
    padding-left: 1rem;
  }

  .preference-list {
    padding-top: .5rem;
    padding-left: 2rem;
    columns: 2;
    column-gap: 3rem;
  }

  .register-button {
    height: auto;
  }
</style>