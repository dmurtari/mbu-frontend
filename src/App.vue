<template>
  <div id="app">
    <navbar></navbar>
    <section class="section">
      <div class="container" v-if="!isApproved && isApproved !== undefined">
        <div class="notification is-warning">
          Your account has not yet been approved by an administrator. You can
          view Merit Badge and Event information,
          <span v-if="isCoordinator">
            but you will not be able to add scouts to your troop or register
            your troop for an event until your account is approved.
          </span>
          <span v-else-if="isTeacher">
            but you will not be able to edit requirements or class information
            until your account is approved.
          </span>
          <span v-else-if="isAdmin">
            but you will not be able to perform administrative tasks until your
            account is approved.
          </span>
          <span v-else>
            but you will not be able to perform other tasks until your account
            is approved.
          </span>
        </div>
      </div>
      <div class="container">
        <router-view></router-view>
      </div>
    </section>
    <!-- <mbu-footer></mbu-footer> -->
  </div>
</template>

<script>
import Footer from './components/navigation/Footer.vue';
import Navbar from './components/navigation/Navbar.vue';

import { mapGetters } from 'vuex';

export default {
  components: {
    'mbu-footer': Footer,
    'navbar': Navbar
  },
  computed: {
    ...mapGetters([
      'isApproved',
      'isCoordinator',
      'isTeacher',
      'isAdmin'
    ])
  },
  mounted() {
    this.$store.dispatch('getProfile')
      .catch((err) => {
        console.log('Could not get profile');
      });
  }
}
</script>

<style lang="scss" scoped>
  .container {
    margin-bottom: 2rem;
  }
</style>