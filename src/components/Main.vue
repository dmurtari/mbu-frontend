<template>
  <div>
    <section class="section">
      <div class="container">
        <h1 class="title is-1">
          Welcome to MBU Online
        </h1>
        <h3 class="subtitle is-3">
          <span v-if="isAdmin">
            Get started on the
            <router-link to="/administration">Administration</router-link> page.
          </span>
          <span v-else-if="isTeacher">
            Get started using the
            <router-link to="/teacher">Teacher</router-link> page.
          </span>
          <span v-else-if="isCoordinator">
            Get started using the
            <router-link to="/coordinator">Manage Troop</router-link> page.
          </span>
          <span v-else>
            <router-link to="/login">Login</router-link> or
            <router-link to="/signup">signup</router-link> to get started
          </span>
        </h3>
      </div>
    </section>
    <section class="section">
      <h4 class="title is-4">
        Latest Event Information
        <span v-if="currentEvent">({{ currentEvent.semester }} {{ currentEvent.year }})</span>
      </h4>
      <event-summary></event-summary>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import EventSummary from 'components/events/EventSummary.vue';

export default {
  computed: {
    ...mapGetters([
      'isAuthenticated',
      'isTeacher',
      'isCoordinator',
      'isAdmin',
      'currentEvent'
    ])
  },
  components: {
    EventSummary
  }
}
</script>
