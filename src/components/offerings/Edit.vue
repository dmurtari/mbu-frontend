<template>
<div>
  <form class="form-inline" v-if="!removing">
    <div class="edit-badge">
      <div class="form-group form-item">
        <label for="offering-periods">Periods:</label>
        <input type="text"
              class="form-control"
              id="offering-periods"
              v-model.lazy="editablePeriods"
              placeholder="Periods">
      </div>
      <div class="form-group form-item">
        <label for="offering-duration">Duration:</label>
        <div class="input-group">
          <select class="form-control" 
                  id="offering-duration"
                  v-model="offering.duration">
            <option value="1">1 period</option>
            <option value="2">2 periods</option>
            <option value="3">3 periods</option>
          </select>
        </div>
      </div>
      <div class="form-group form-item">
        <label for="offering-price">Price:</label>
        <input type="number"
               class="form-control"
               id="offering-price"
               v-model="offering.price"
               placeholder="Price">
      </div>
      <div class="form-group form-item">
        <button class="btn btn-primary"
                @click.prevent="saveOffering()">
          <span class="glyphicon glyphicon-ok" aria-label="Save"></span>
        </button>
        <button class="btn btn-default"
                @click.prevent="toggleEdit()">
          <span class="glyphicon glyphicon-remove" aria-label="Cancel"></span>
        </button>
        <button class="btn btn-danger"
                @click.prevent="toggleRemove()">
          <span class="glyphicon glyphicon-trash" aria-label="Remove"></span>
        </button>
      </div>
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
        this.offering.periods = _.map(_.split(newPeriods, ',', 3), (period) => {
          return Number(_.trim(period));
        });
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
          return this.$store.dispatch('getOfferings', this.eventId);
        })
        .then(() => {
          this.error = '';
          this.$emit('cancel');
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
          this.$emit('cancel');
        })
        .catch(() => {
          this.error = 'Failed to save badge. Please try again.';
        })
    }
  },
  mounted() {
    this.offering.periods = this.badge.periods;
    this.offering.duration = this.badge.duration;
    this.offering.price = this.badge.price;
  }
}
</script>

<style lang="sass">
.edit-badge {
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-flow: row wrap;
  flex: 1 1 20%;

  .form-group {
    margin-top: 1em;
    margin-bottom: 1em;
  }
}
</style>