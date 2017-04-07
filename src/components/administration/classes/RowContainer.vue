<template>
  <div class="class-row">
    <condensed-row v-if="!expanded"
                   :badge="badge"
                   :assignees="scoutsByPeriod"
                   :duration="duration"
                   @expand="toggleExpand(true)"></condensed-row>
    <expanded-row v-else
                  :badge="badge"
                  :assignees="scoutsByPeriod"
                  :duration="duration"
                  @collapse="toggleExpand(false)"></expanded-row>
  </div>
</template>

<script>
import CondensedRow from './CondensedRow.vue';
import ExpandedRow from './ExpandedRow.vue'

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
        let scout = {
          periods: assignee.assignment.periods,
          scout: assignee.scout
        };

        scout.scout.completions = assignee.assignment.completions;
        return scout;
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
    toggleExpand(newValue = undefined) {
      if (typeof newValue === 'undefined') {
        this.expanded = !this.expanded
      } else {
        this.expanded = newValue
      }
    }
  },
  components: {
    CondensedRow,
    ExpandedRow
  }
}
</script>

<style scoped lang="sass">
  .class-row {
    padding-top: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid lightgray;
  }

  b.is-light {
    color: lightgray;
  }

  .info {
    color: #888;
  }
</style>