export default {
  data() {
    return {
      assignees: [],
    };
  },
  computed: {
    scoutsByPeriod() {
      let scoutPeriods = _.map(this.assignees, (assignee) => {
        let scout = {
          periods: assignee.assignment.periods,
          scout: assignee.scout
        };

        scout.scout.registrationId = assignee.registration_id;
        scout.scout.scoutId = assignee.scout_id;
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
    }
  }
}