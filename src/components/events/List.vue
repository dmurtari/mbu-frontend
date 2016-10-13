<template>
  <div class="container">
    <div>
      <h3>All Events
         <button class="btn btn-default"
                 @click="toggleAdd">+</button>
      </h3>
    </div>
    <create-event v-if="displayAddEvent">Hello</create-event>
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