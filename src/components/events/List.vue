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
    <create-event @cancel="toggleAdd" v-show="displayAddEvent"></create-event>
  </div>
</template>

<script>
import auth from '../../services/auth';

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
  }
}
</script>

<style scoped lang="sass">

</style>