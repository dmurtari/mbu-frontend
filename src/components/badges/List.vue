<template>
<div class="container-fluid">
  <h3 class="page-header">All Badges ({{ totalBadges }} Total)
    <button class="btn btn-default"
            v-if="isAdmin"
            @click="toggleAdd()"
            data-toggle="tooltip" 
            data-placement="right" 
            title="Toggle badge creation panel">
      <span v-if="!displayAddBadge" 
            class="glyphicon glyphicon-plus"></span>
      <span v-if="displayAddBadge" 
            class="glyphicon glyphicon-minus"></span>
    </button>
  </h3>
  <badge-create @close="toggleAdd()" v-show="displayAddBadge"></badge-create>
  <div class="badge-list">
    <badge v-for="badge in badges" :badge="badge"></badge>
  </div>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

import Badge from './Badge.vue';
import BadgeCreate from './Create.vue';

export default {
  data() {
    return {
      displayAddBadge: false
    };
  },
  computed: {
    ...mapGetters([
      'isAdmin',
      'badges'
    ]),
    totalBadges() {
      return this.badges.length;
    }
  },
  methods: {
    toggleAdd() {
      this.displayAddBadge = !this.displayAddBadge;
    }
  },
  components: {
    'badge': Badge,
    'badge-create': BadgeCreate
  },
  mounted() {
    this.$store.dispatch('getBadges');
    $('[data-toggle="tooltip"]').tooltip();
  }
}
</script>

<style lang="sass">
.badge-list {
  margin-top: 2em;
}
</style>