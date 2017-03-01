<template>
  <div>
    <b>Assign Merit Badges</b>
    <p>
      Assign Merit Badges for {{ scout.fullname }} for MBU {{ event.semester }}
      {{ event.year }} here. Select a merit badge from the dropdown for each
      period. Merit Badges that are not offered for that period are grayed out.
    </p>
    <br>
    <p>
      {{ scout.fullname }} has listed as their preferences:
    </p>
    <ul>
      <li v-for="preference in preferences">
        {{ preference.details.rank }}: {{ preference.badge.name }}
        <span v-if="preference.price !== '0.00'">
          ({{ preference.price | currency }})
        </span>
      </li>
    </ul>
    <form class="form">
      <div class="columns">
        <div class="control column is-4">
          <label class="label" for="period-1-assignment">Period 1:</label>
          <span class="input-group select">
            <select class="input"
                    id="period-1-assignment">
              <option :value="null">No Assignment</option>
              <option disabled></option>
              <optgroup label="Preferences">
                <option v-for="preference in preferences"
                        :value="preference.offering_id"
                        :disabled="!offered(preference.offering_id, 1)">
                  {{ preference.badge.name }}
                </option>
              </optgroup>
              <option disabled></option>
              <optgroup label="All Offerings">
                <option v-for="offering in sortedOfferings"
                        :value="offering.details.id"
                        :disabled="!offered(offering.details.id, 1)">
                  {{ offering.name }}
                </option>
              </optgroup>
            </select>
          </span>
        </div>
        <div class="control column is-4">
          <label class="label" for="period-2-assignment">Period 2:</label>
          <span class="input-group select">
            <select class="input"
                    id="period-2-assignment">

            </select>
          </span>
        </div>
        <div class="control column is-4">
          <label class="label" for="period-3-assignment">Period 3:</label>
          <span class="input-group select">
            <select class="input"
                    id="period-3-assignment">

            </select>
          </span>
        </div>
      </div>
    </form>
    </form>
    <button class="button is-primary">Save Assignments</button>
    <button class="button"
            @click="$emit('done')">Cancel</button>

  </div>
</template>

<script>
import _ from 'lodash';

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
    preferences: {
      type: Array,
      default: () => { return []; }
    },
    registration: {
      type: Object,
      require: true
    }
  },
  data() {
    return {
      assignments: []
    };
  },
  computed: {
    sortedOfferings() {
      return _.orderBy(this.event.offerings, 'name');
    },
    assignmentsByPeriod: {
      set() {

      },
      get() {

      }
    }
  },
  methods: {
    offered(offeringId, period) {
      let offering = _.find(this.event.offerings, (offering) => {
        return offering.details.id === offeringId;
      });

      return _.indexOf(offering.details.periods, period) >= 0;
    }
  }
}
</script>

<style lang="sass" scoped>
  li {
    padding-left: 1rem;
  }

  form {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
</style>