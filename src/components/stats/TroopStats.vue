<template>
  <div>
    Statistics
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      error: '',
      loading: false
    };
  },
  computed: {
    ...mapGetters([
      'registrations'
    ]),
    selectedRegistration() {
      return _.find(this.registrations, (registration) => {
        return registration.eventId === this.event.id;
      });
    }
  },
  mounted() {
    if (!this.selectedRegistration) {
      this.$store.dispatch('getRegistrations', this.event.id)
        .then(() => {
          this.loading = false;
          this.error = '';
        })
        .catch(() => {
          this.loading = false;
          this.error = 'Failed to get the necessary information for statistics.';
        })
    }
  }
}
</script>