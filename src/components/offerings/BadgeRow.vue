<template>
<div class="badge-row row">
  <b class="col-md-2">{{ badge.name }}</b>
  <form class="form col-md-10 row" v-if="!removing">
    <div class="form-group col-md-2">
      <label for="offering-periods" class="sr-only">Periods</label>
      <input type="text"
              class="form-control"
              id="offering-periods"
              v-model.lazy="editablePeriods"
              placeholder="Periods"
              :disabled="!offered && !creating">
    </div>
    <div class="form-group col-md-3">
      <label for="offering-duration" class="sr-only">Duration</label>
      <div class="input-group">
        <masked-input mask="9"
                      id="offering-duration"
                      type="Number"
                      placeholder="Duration"
                      v-model="offering.duration"
                      :disabled="!offered && !creating"></masked-input>
        <span class="input-group-addon">{{ durationLabel }}</span>
      </div>
    </div>
    <div class="form-group col-md-2">
      <label for="offering-price" class="sr-only">Price</label>
      <div class="input-group">
        <span class="input-group-addon">$</span>
        <masked-input mask="99.99"
                      id="offering-price"
                      type="Number"
                      placeholder="Price"
                      v-model="offering.price"
                      :disabled="!offered && !creating">
      </div>
    </div>
    <div class="form-group col-md-5">
      <span v-if="!creating">
        <button v-if="offered"
                @click.prevent="saveOffering()"
                class="btn btn-primary">Save Offering</button>
        <button v-if="offered" 
                @click.prevent="toggleRemove()"
                class="btn btn-danger">Remove This Offering</button>
        <button v-if="!offered"
                @click.prevent="toggleCreate()"
                class="btn btn-success">Offer This Badge</button>
      </span>
      <span v-if="creating">
        <button @click.prevent="createOffering()"
                class="btn btn-success">Finish Adding</button>
        <button @click.prevent="toggleCreate()"
                class="btn btn-default">Cancel Adding</button>
      </span>
    </div>
  </form>
  <confirm-delete v-if="removing"
                  :match-text="this.badge.name"
                  class="col-md-10"
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
    }
  },
  data() {
    return {
      offering: {
        periods: [],
        duration: 1,
        price: 0
      },
      creating: false,
      removing: false,
      saving: false,
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
    durationLabel() {
      return Number(this.offering.duration) == 1 ? 'period ' : 'periods';
    },
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
    createOffering() {
      console.log('Creating');
    },
    deleteOffering() {
      console.log('Removing');
    },
    toggleCreate() {
      this.creating = !this.creating;
    },
    toggleRemove() {
      this.removing = !this.removing;
    },
    saveOffering() {
      console.log('Saving');
    }
  },
  mounted() {
    this.offering.periods = this.badge.periods;
    this.offering.duration = this.badge.duration;
    this.offering.price = this.badge.price;
  }
}
</script>

<style lang="sass" scoped>
.badge-row {
  padding-top: 1em;
  padding-bottom: 1em;
  border-bottom: 1px lightgray solid;
  display: flex;
  align-items: center;
}

.form-group {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>