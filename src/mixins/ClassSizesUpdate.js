import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      classesLoading: false,
      classLoadError: ''
    }
  },
  computed: {
    ...mapGetters([
      'eventClasses'
    ])
  },
  methods: {
    hasClassInfoForEvent(eventId) {
      const classes = this.eventClasses[eventId] || {};
      return classes && classes.length > 0 && classes[0].sizeInfo;
    },
    loadClasses(eventId) {
      this.classesLoading = true;

      this.$store.dispatch('getClasses', eventId)
        .then((classes) => {
          return this.$store.dispatch('getClassSizes', {
            eventId: eventId,
            badgeIds: _.map(classes, 'badge.badge_id')
          })
        })
        .then(() => {
          this.classLoadError = '';
        })
        .catch(() => {
          this.classLoadError = 'Failed to get classes for this event';
        })
        .then(() => {
          this.classesLoading = false;
        });
    }
  }
};
