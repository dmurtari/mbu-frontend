<template>
  <div id="app">
    <navbar></navbar>
    <section class="section">
      <div class="container" v-if="!isApproved">
        <div class="notification is-warning">
          Your account has not yet been approved by an administrator. You can
          view Merit Badge and Event information, but other functionality will
          be restricted until your account has been approved.
        </div>
      </div>
      <router-view></router-view>
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
      'isApproved'
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

<style lang="sass" scoped>
  .container {
    margin-bottom: 2rem;
  }
</style>