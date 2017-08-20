<template>
  <div>
    <section class="hero is-white is-small">
      <div class="hero-body">
        <div class="container">
          <h1 class="title is-1">
            Welcome to MBU Online
          </h1>
          <h3 class="subtitle is-3">
            Hosted by Alpha Phi Omega
          </h3>
        </div>
      </div>
    </section>
    <p class="section">
      <span v-if="isAdmin">
        Use this website to manage available merit badges, events, items available for purchase
        at events, scout class assignments, and to manage event registrations. Get
        started on the
        <router-link to="/administration">Administration</router-link> page.
      </span>
      <span v-else-if="isTeacher">
        Use this website to manage class assignments and class completions for scouts. Get
        started using the
        <router-link to="/teacher">Teacher</router-link> page.
      </span>
      <span v-else-if="isCoordinator">
        Use this website to register scouts in your troop for Merit Badge University events,
        and to view completion records for past events. Get started using the
        <router-link to="/coordinator">Manage Troop</router-link> page.
      </span>
      <span v-else>
        This website is for managing registrations for the Merit Badge University, hosted
        by Alpha Phi Omega. If you already have an account,
        <router-link to="/login">login here</router-link>. If you need to create an account,
        <router-link to="/signup">signup here</router-link> (note that your account will need to be approved
        by an administrator before you will be able to perform any tasks).
      </span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'isTeacher',
      'isCoordinator',
      'isAdmin'
    ])
  }
}
</script>
