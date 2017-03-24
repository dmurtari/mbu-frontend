<template>
  <div>
    <div v-if="!loading">
      <h5 class="title is-5">Details about {{ scout.fullname }}</h5>

    </div>
    <div v-else>

    </div>
  </div>
</template>

<script>
import axios from 'axios';

import URLS from 'urls';

export default {
  data() {
    return {
      loading: false,
      error: '',
      scout: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    axios.get(URLS.SCOUTS_URL + to.params.id)
      .then((response) => {
        return next(vm => {
          vm.scout = response.data;
          vm.error = '';
        });
      })
      .catch(() => {
        return next(vm => {
          vm.loading = false;
          vm.error = 'Failed to get details for this scout. Please refresh and try again';
        });
      });
  }
}
</script>