<template>
  <div>
    <div class="notification is-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <h5 class="title is-5">
      Register {{ scout.fullname }} for {{ event.semester }} {{ event.year}}
    </h5>
    <div class="columns is-multiline" v-if="!registered">
      <p class="column is-12">
        Please select the top six merit badges that {{ scout.firstname}} would
        like to attend classes for. We will do our best to accommodate
        preferences.
      </p>
      <template v-for="(preference, index) in preferences">
        <div class="column is-6 is-4-widescreen">
          <label class="label"
            :for="'registration-rank' + index">
            {{ index + 1 | ordinalSuffix }}&nbsp;choice:
          </label>
          <div class="control">
            <span class="select">
              <select class="input"
                      :id="'registration-rank' + index"
                      @blur="$v.preferences.$each[index].$touch"
                      :class="{ 'is-danger': $v.preferences.$each[index].$error }"
                      v-model="preference.offering">
                <option v-for="option in offerings" :value="option.details.id">
                  {{ option.name }}
                  <span v-if="option.details.price !== '0.00'">
                    ({{ option.details.price | currency }})
                  </span>
                </option>
              </select>
            </span>
            <span class="help is-danger"
                  v-if="$v.preferences.$each[index].$error">
              Please select a {{ index + 1 | ordinalSuffix }}&nbsp;choice badge
            </span>
          </div>
        </div>
      </template>
      <div class="column is-12">
        <button class="button is-primary"
                :disabled="$v.$invalid"
                :class="{ 'is-disabled is-loading': creating }"
                @click="registerScout()">
          Register Scout
        </button>
        <button class="button"
                :class="{ 'is-disabled': creating }"
                @click="cancel()">
          Cancel
        </button>
      </div>
    </div>
    <div v-if="registered">
      <div class="notification is-success">
        <p>
          {{ scout.fullname }} has successfully been registered for MBU
          {{ event.semester }} {{ event.year }}! Add any additional items to
          purchase below.
        </p>
      </div>
      <purchases :event="event"
                 :purchasables="event.purchasables"
                 :existingPurchases="registration.purchases"
                 :scoutId="scout.id"
                 :registrationId="registrationId"></purchases>
      <br>
      <button class="button is-primary"
              @click="done()">Done</button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';

import Purchases from './Purchases.vue';

export default {
  props: {
    scout: {
      type: Object,
      required: true
    },
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      preferences: [],
      creating: false,
      error: '',
      registered: false,
      registrationId: null
    };
  },
  computed: {
    offerings() {
      return _.orderBy(this.event.offerings, 'name');
    },
    registration() {
      return _.find(this.scout.registrations, { 'event_id': this.event.id }) || {};
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    done() {
      this.$emit('created');
    },
    registerScout() {
      if (!this.uniqueOfferings()) {
        this.error = 'Merit Badge requests cannot be duplicates.';
        return;
      }

      this.creating = true;
      this.$store.dispatch('addRegistration', {
        scoutId: this.scout.id,
        eventId: this.event.id
      })
        .then((registration) => {
          this.registrationId = registration.id;
          return this.$store.dispatch('setPreferences', {
            scoutId: this.scout.id,
            registrationId: registration.id,
            preferences: this.preferences
          })
        })
        .then(() => {
          this.error = '';
          this.creating = false;
          this.registered = true;
        })
        .catch((err) => {
          this.creating = false;
          this.error = 'Failed to register scout for this event.';
        });
    },
    uniqueOfferings() {
      let offerings = _.map(this.preferences, 'offering');
      console.log(offerings)
      return _.uniq(offerings).length === offerings.length;
    }
  },
  mounted() {
    for (var i = 1; i <= 6; i++) {
      this.preferences.push({
        rank: i,
        offering: ''
      })
    }
  },
  components: {
    Purchases
  },
  validations: {
    preferences: {
      $each: {
        offering: { required }
      }
    }
  }
}
</script>