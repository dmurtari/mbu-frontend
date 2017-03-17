<template>
  <div class="class-row columns">
    <div class="column is-2">
      <b>{{ badge }}</b>
      <button class="button is-white is-pulled-right is-hidden-tablet"
              data-balloon="Toggle Details"
              @click="toggleExpand()"
              :disabled="assignees.length < 1">
        <span class="icon is-small">
          <i v-if="expanded" class="fa fa-minus"></i>
          <i v-else class="fa fa-plus"></i>
        </span>
      </button>
      <div v-if="expanded">
        <p>
          {{ duration }} {{ duration === 1 ? 'period' : 'periods '}} long
        </p>
        <p>
          {{ assignees.length }}
          {{ assignees.length === 1 ? 'scout' : 'scouts' }}
        </p>
      </div>
    </div>
    <div v-for="n in 3" class="column auto">
      <div v-if="scoutsForPeriod(n).length > 0">
        <b>
          Period {{ n }}:
        </b>
        {{ scoutsForPeriod(n).length }}
        {{ scoutsForPeriod(n).length === 1 ? 'scout' : 'scouts' }}
        <ul v-if="expanded">
          <li v-for="scout in scoutsForPeriod(n)">
            Troop {{ scout.troop }} {{ scout.fullname }}
          </li>
        </ul>
      </div>
    </div>
    <div class="column is-1 is-hidden-mobile">
      <button class="button is-white"
              data-balloon="Toggle Details"
              @click="toggleExpand()"
              :disabled="assignees.length < 1">
        <span class="icon is-small">
          <i v-if="expanded" class="fa fa-minus"></i>
          <i v-else class="fa fa-plus"></i>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    badge: {
      type: String,
      required: true
    },
    assignees: {
      type: Array,
      default: () => []
    },
    duration: {
      type: Number,
      required: true
    },
    periods: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      expanded: false
    };
  },
  computed: {
    scoutsByPeriod() {
      let scoutPeriods = _.map(this.assignees, (assignee) => {
        return {
          periods: assignee.assignment.periods,
          scout: assignee.scout
        };
      });

      return _.reduce(scoutPeriods, (acc, elt) => {
        _.forEach(elt.periods, (period) => {
          if (acc[period]) {
            acc[period].push(elt.scout)
          } else {
            acc[period] = [elt.scout]
          }
        });

        return acc;
      }, []);
    }
  },
  methods: {
    scoutsForPeriod(period) {
      let scouts = this.scoutsByPeriod[period] || {}
      return _.orderBy(scouts, 'lastname');
    },
    toggleExpand() {
      this.expanded = !this.expanded
    }
  }
}
</script>

<style scoped lang="sass">
  .class-row {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgray;
  }
</style>