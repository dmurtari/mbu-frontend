<template>
  <div>
    <closable-error v-if="error"
                    @dismissed="dismissError()">{{ error }}</closable-error>
    <spinner-page v-if="loading"></spinner-page>
    <div v-else>
      <div class="section">
        <h3 class="title is-3">{{ user.firstname }} {{ user.lastname }}</h3>
        <h5 class="subtitle is-5"
            v-if="user.details.troop">
          Troop {{ user.details.troop }}, {{ user.details.district }} District, {{ user.details.council
          }} Council
        </h5>
      </div>
      <div class="section">
        <h5 class="title is-5">User Details</h5>
        <ul>
          <li>
            <strong>Email: </strong> {{ user.email }}
          </li>
          <li>
            <strong>User Since: </strong> {{ user.created_at | shortDate }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

import URLS from 'urls';

export default {
  data () {
    return {
      error: '',
      loading: false,
      user: {}
    }
  },
  methods: {
    dismissError () {
      this.error = '';
    }
  },
  created () {
    this.loading = true;
    axios.get(URLS.USERS_URL + this.$route.params.id + '/scouts')
      .then((response) => {
        this.user = response.data[0];
        this.error = '';
        this.loading = false;
      })
      .catch(() => {
        this.error = 'Failed to get user details. Please refresh or try again later.';
        this.loading = false;
      });
  }
}
</script>

<style lang="scss" scoped>
.section {
  padding-top: 2rem;
  padding-bottom: 2rem;
  padding-left: 0rem;
  padding-right: 0rem;
}
</style>

