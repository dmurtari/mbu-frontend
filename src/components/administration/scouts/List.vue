<template>
  <div>
    <h4 class="title is-4">All Scouts</h4>
    <p>
      This is a list of all scouts that have ever been registered for MBU
      Online.
    </p>
  </div>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';

import URLS from 'urls';

export default {
  data() {
    return {
      scouts: [],
      error: ''
    };
  },
  mounted() {
    this.loading = true;
    axios.get(URLS.SCOUTS_URL)
      .then((response) => {
        this.loading = false;
        console.log(response);
        this.scouts = response.data;
        this.error = '';
      })
      .catch(() => {
        this.loading = false
        this.error = 'Failed to retrieve scouts. Please refresh and try again.';
      });
  }
}
</script>