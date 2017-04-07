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
    }
  },
  methods: {
    scoutsForPeriod(period) {
      let scouts = this.assignees[period] || {}
      return _.orderBy(scouts, 'lastname');
    }
  }
}
</script>