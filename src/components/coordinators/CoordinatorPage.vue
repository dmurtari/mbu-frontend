<template>
  <div class="container">
    <h3 class="title is-3">Troop Administration</h3>
    <h5 class="subtitle is-5">
      Manage scouts in your troop. Add and edit existing scouts, register
      scouts for Merit Badge University events, and view their completion
      records.
    </h5>
    <div class="columns">
      <div class="column is-3">
        <aside class="menu">
          <p class="menu-label">Jump to a Section</p>
          <ul class="menu-list">
            <router-link to="/coordinator/scouts">Manage Scouts</router-link>
            <router-link to="/coordinator/registrations">Event Registrations</router-link>
          </ul>
        </aside>
      </div>
      <div class="column">
        <div class="notification is-danger" v-if="error">
          <p>{{ error }}</p>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../../store'

export default {
  data() {
    return {
      error: '',
      loading: true
    };
  },
  beforeRouteEnter(to, from, next) {
    store.dispatch('getProfile')
      .then(() => {
        return Promise.all([
          store.dispatch('getRegistrations', store.state.authentication.profile.id),
          store.dispatch('getEvents'),
          store.dispatch('getBadges')
        ])
      })
      .then(() => {
        next(vm => {
          console.log(vm)
          vm.loading = false;
        });
      })
      .catch(() => {
        next(vm => {
          vm.loading = false;
          vm.error = 'Unable to fetch data from server. Please try again.';
        })
      })
  }
}
</script>