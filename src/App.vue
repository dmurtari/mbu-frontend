<template>
  <div id="app">
    <navbar></navbar>
    <div class="container">
      <router-view></router-view>
    </div>
    <mbu-footer></mbu-footer>
  </div>
</template>

<script>
import Footer from './components/navigation/Footer.vue';
import Navbar from './components/navigation/Navbar.vue';

export default {
  components: {
    'mbu-footer': Footer,
    'navbar': Navbar
  },
  mounted() {
    this.$store.dispatch('getProfile')
      .catch((err) => {
        console.log('Could not get profile');
      });
  }
}
</script>