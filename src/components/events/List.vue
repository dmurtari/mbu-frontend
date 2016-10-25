<template>
  <div class="container">
    <div>
      <h3>All Events
        <button class="btn btn-default"
                @click="toggleAdd">
          <span class="glyphicon glyphicon-plus" aria-label="Close"></span>
        </button>
      </h3>
    </div>
    <create-event @close="toggleAdd" v-show="displayAddEvent"></create-event>
  </div>
</template>

<script>
import auth from '../../services/auth';
import CreateEvent from './CreateEvent.vue';

export default {
  data() {
    return {
      user: auth.user,
      profile: auth.getProfile,
      displayAddEvent: false
    }
  },
  methods: {
    isAuthorized() {
      return this.profile.role === 'admin'
    },
    toggleAdd() {
      this.displayAddEvent = !this.displayAddEvent
    }
  },
  components: {
    'create-event': CreateEvent
  }
}
</script>