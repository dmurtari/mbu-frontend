<template>
  <div>
    <h5 class="title is-5">Editing {{ badge.name }}</h5>
    <div class="notification is-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <div class="notification is-danger" v-if="invalidPeriodsError">
      <p>
        {{ invalidPeriodsError }}
      </p>
    </div>
    <form class="form" v-if="!removing">
      <div class="columns multiline">
        <div class="control column is-4">
          <label class="label" for="offering-periods">Periods:</label>
          <input type="text"
                 class="input"
                 id="offering-periods"
                 v-model.lazy="editablePeriods"
                 :class="{ 'is-danger': $v.offering.periods.$error }"
                  @blur="$v.offering.periods.$touch"
                 placeholder="Periods">
          <span class="help is-danger" v-if="$v.offering.periods.$error">
            Enter the periods this badge will be offered (separated by commas)
          </span>
        </div>
        <div class="control column is-4">
          <label class="label" for="offering-duration">Duration:</label>
          <span class="input-group select duration-select">
            <select class="input"
                    id="offering-duration"
                    :class="{ 'is-danger': $v.offering.duration.$error }"
                    @blur="$v.offering.duration.$touch"
                    v-model="offering.duration">
              <option value="1">1 period</option>
              <option value="2">2 periods</option>
              <option value="3">3 periods</option>
            </select>
          </span>
          <span class="help is-danger" v-if="$v.offering.duration.$error">
            Pick the duration of this class
          </span>
        </div>
        <div class="control column is-4">
          <label class="label" for="offering-price">Price:</label>
          <input type="number"
                 class="input"
                 id="offering-price"
                 v-model="offering.price"
                 :class="{ 'is-danger': $v.offering.price.$error }"
                  @blur="$v.offering.price.$touch"
                 placeholder="Price">
          <span class="help is-danger" v-if="$v.offering.price.$error">
            Enter the price of this class
          </span>
        </div>
      </div>
      <div class="control">
        <button class="button is-primary"
                :disabled="$v.$invalid"
                :class="{ 'is-loading is-disabled': saving }"
                @click.prevent="saveOffering()">
          Save Offering
        </button>
        <button class="button is-light"
                @click.prevent="toggleEdit()">
          Cancel Changes
        </button>
        <button class="button is-danger is-pulled-right"
                @click.prevent="toggleRemove()">
          Remove
        </button>
      </div>
    </form>
    <confirm-delete v-if="removing"
                    :match-text="this.badge.name"
                    :placeholder="'Badge Name'"
                    @deleteSuccess="deleteOffering()"
                    @close="toggleRemove()">
      <span slot="header">
        Do you really want to remove this offering? This cannot be undone, and will
        likely break existing registration records!
      </span>
      <span slot="help-text">
        Enter the full name of this badge with correct capitalization to confirm
        that you wish to remove this offering. <b>This action cannot be undone, and
        will delete all associated completion records and badge requests! Adding
        this badge as an offering again will not restore previous records and
        requests!</b>
      </span>
    </confirm-delete>
  </div>
</template>

<script>
import { required, between } from 'vuelidate/lib/validators';

export default {
  props: {
    badge: {
      type: Object,
      required: true
    },
    eventId: {
      required: true
    }
  },
  data() {
    return {
      offering: {
        periods: [],
        duration: 1,
        price: '0.00'
      },
      invalidPeriodsError: '',
      removing: false,
      saving: false,
      error: ''
    };
  },
  watch: {
    badge() {
      this.offering.periods = this.badge.periods;
      this.offering.duration = this.badge.duration;
      this.offering.price = this.badge.price;
    }
  },
  computed: {
    editablePeriods: {
      get() {
        return _.join(_.sortBy(this.offering.periods), ', ');
      },
      set(newPeriods) {
        this.offering.periods = _.without(_.map(_.split(newPeriods, ',', 3), (period) => {
          return Number(_.trim(period));
        }), null, 0);
      }
    },
    offered() {
      return !_.isEmpty(this.badge.periods);
    }
  },
  methods: {
    deleteOffering() {
      this.$store.dispatch('deleteOffering', {
        eventId: this.eventId,
        badgeId: this.badge.badge_id
      })
        .then(() => {
          this.$emit('cancel');
          this.error = '';
          this.$store.dispatch('getOfferings', this.eventId);
        })
        .catch(() => {
          this.error = 'Failed to remove badge from this event. Please try again';
        })
    },
    toggleRemove() {
      this.removing = !this.removing;
    },
    toggleEdit() {
      this.$emit('cancel');
    },
    saveOffering() {
      _.pull(this.offering.periods, null);
      let sortedPeriods = this.offering.periods.sort();

      if (this.offering.duration == 2 && !_.isEqual(sortedPeriods, [2, 3])) {
        this.error = 'Offerings that last 2 periods must be assigned periods 2 and 3';
        return;
      }

      if (this.offering.duration == 3 && !_.isEqual(sortedPeriods, [1, 2, 3])) {
        this.error = 'For offerings that last 3 periods, periods must be 1, 2, and 3';
        return;
      }

      this.saving = true;
      this.$store.dispatch('updateOffering', {
        eventId: this.eventId,
        badgeId: this.badge.badge_id,
        offering: this.offering
      })
        .then(() => {
          return this.$store.dispatch('getOfferings', this.eventId);
        })
        .then(() => {
          this.error = '';
          this.saving = false;
          this.$emit('cancel');
        })
        .catch(() => {
          this.saving = false;
          this.error = 'Failed to save badge. Please try again.';
        })
    }
  },
  mounted() {
    this.offering.periods = this.badge.periods;
    this.offering.duration = this.badge.duration;
    this.offering.price = this.badge.price;
  },
  validations: {
    offering: {
      periods: { required }, //, $each: { between: between(1, 3) } },
      duration: { required },
      price: { required }
    }
  }
}
</script>

<style lang="sass" scoped>
.submit-group {
  margin-top: 25px;
}

.duration-select {
  width: 100%;

  select {
    width: 100%;
  }
}
</style>