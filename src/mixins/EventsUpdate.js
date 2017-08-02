import ClosableError from 'components/shared/ClosableError.vue';
import SpinnerPage from 'components/shared/SpinnerPage.vue';

export default {
  data() {
    return {
      eventLoading: false,
      eventLoadError: ''
    }
  },
  created() {
    this.eventLoading = true;
    Promise.all([
      this.$store.dispatch('getEvents'),
      this.$store.dispatch('getCurrentEvent')
    ])
      .then(() => {
        this.eventLoading = false;
        this.eventLoadError = '';
      })
      .catch(() => {
        this.eventLoading = false;
        this.eventLoadError = 'Failed to fetch event data. Please refresh to try again.';
      });
  },
  components: {
    ClosableError,
    SpinnerPage
  }
}
