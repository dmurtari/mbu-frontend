<template>
<div class="badge-row">
  <b class="col-xs-2">{{ badge.name }}</b>
  <form class="form col-xs-8">
    <fieldset :disabled="!offered">
      <div class="form-group col-sm-3">
        <label for="offering-periods" class="sr-only">Periods</label>
        <input type="text"
               class="form-control"
               id="offering-periods"
               v-model="offering.periods"
               placeholder="Periods Offered">
      </div>
      <div class="form-group col-sm-4">
        <label for="offering-duration" class="sr-only">Duration</label>
        <div class="input-group">
          <masked-input mask="9"
                        id="offering-duration"
                        type="Number"
                        placeholder="Duration"
                        v-model="offering.duration"></masked-input>
          <div class="input-group-addon">{{ durationLabel }}</div>
        </div>
      </div>
      <div class="form-group col-sm-3">
        <label for="offering-price" class="sr-only">Price</label>
        <div class="input-group">
          <div class="input-group-addon">$</div>
          <masked-input mask="99.99"
                        id="offering-price"
                        type="Number"
                        placeholder="Price"
                        v-model="offering.price">
        </div>
      </div>
      <div class="form-group col-sm-2 pull-right">
        <button class="btn btn-primary">Save Offering</button>
      </div>
    </fieldset>
  </form>
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
        periods: '',
        duration: 1,
        price: 0
      }
    };
  },
  watch: {
    badge() {
      this.offering.periods = _.join(this.badge.periods, ', ');
      this.offering.duration = this.badge.duration;
      this.offering.price = this.badge.price;
    }
  },
  computed: {
    durationLabel() {
      return Number(this.offering.duration) == 1 ? 'period ' : 'periods';
    },
    offered() {
      return !_.isEmpty(this.badge.periods);
    }
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