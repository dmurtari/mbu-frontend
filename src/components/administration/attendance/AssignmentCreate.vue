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
        <div v-for="n in 3" class="control column is-4">
          <label class="label" for="period-1-assignment">Period {{ n }}:</label>
          <span class="input-group select">
            <select class="input"
                    :id="'period-' + n + '-assignment'"
                    @change="checkDuration($event)"
                    v-model="assignments[n - 1]">
              <option :value="null">No Assignment</option>
              <option disabled></option>
              <optgroup label="Preferences">
                <option v-for="preference in preferences"
                        :value="preference.offering_id"
                        :disabled="!offered(preference.offering_id, n)">
                  {{ preference.badge.name }}
                  <span v-if="preference.price !== '0.00'">
                    ({{ preference.price | currency }})
                  </span>
                  <span v-if="preference.duration > 1">
                    ({{ preference.duration }} periods)
                  </span>
                </option>
              </optgroup>
              <option disabled></option>
              <optgroup label="All Offerings">
                <option v-for="offering in sortedOfferings"
                        :value="offering.details.id"
                        :disabled="!offered(offering.details.id, n)">
                  {{ offering.name }}
                  <span v-if="offering.details.price !== '0.00'">
                    ({{ offering.details.price | currency }})
                  </span>
                  <span v-if="offering.details.duration > 1">
                    ({{ offering.details.duration }} periods)
                  </span>
                </option>
              </optgroup>
            </select>
          </span>
        </div>
      </div>
    </form>
    </form>
    <button class="button is-primary"
            :class=" {' is-disabled is-loading': saving }"
            @click="setAssignments()">Save Assignments</button>
    <button class="button"
            :class=" {'is-disabled': saving }"
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
      assignments: [],
      saving: false
    };
  },
  computed: {
    sortedOfferings() {
      return _.orderBy(this.event.offerings, 'name');
    }
  },
  methods: {
    checkDuration(event) {
      console.log(event.target.value)
    },
    offered(offeringId, period) {
      let offering = _.find(this.event.offerings, (offering) => {
        return offering.details.id === offeringId;
      });

      return _.indexOf(offering.details.periods, period) >= 0;
    },
    setAssignments() {
      this.saving = true;

      let postData = [];

      _.forEach(this.assignments, (assignment, index) => {
        let existingData = _.find(postData, { offering: assignment });
        if (existingData) {
          existingData.periods.push(index + 1);
        } else {
          postData.push({
            periods: [index + 1],
            offering: assignment
          });
        }
      });

      this.$store.dispatch('setAssignments', {
        scoutId: this.scout.scout_id,
        registrationId: this.registration.id,
        assignments: postData,
        eventId: this.event.id
      })
        .then(() => {
          this.error = '';
          this.saving = false;
        })
        .catch(() => {
          this.error = 'Failed to save assignments. Please refresh and try again';
          this.saving = false;
        })
    }
  },
  mounted() {
    this.assignments = _.reduce(this.assignments, (array, assignment) => {
      _.forEach(assignment.periods, (period) => {
      array[Number(period)
        - 1] = assignment.offering;
      });
    }, []);
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