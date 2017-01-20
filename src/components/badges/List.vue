<template>
  <div class="container">
    <h3 class="title is-3">All Badges ({{ totalBadges }} Total)
      <button class="button is-primary"
              v-if="isAdmin"
              @click="toggleAdd()">
        <span v-if="!displayAddBadge" 
              class="fa fa-plus"></span>
        <span v-if="displayAddBadge" 
              class="fa fa-minus"></span>
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
  }
}
</script>

<style lang="sass">
.badge-list {
  margin-top: 2em;
}
</style>