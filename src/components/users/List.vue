<template>
<div>
  Listing Users
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'users'
    ])
  },
  mounted() {
    this.$store.dispatch('getUsers');
  }
}
</script>