<template>
<div class="container-fluid">
  <h3>All Badges
    <button class="btn btn-default"
            v-if="isAdmin"
            @click="toggleAdd"
            data-toggle="tooltip" 
            data-placement="right" 
            title="Add a badge">
      <span class="glyphicon glyphicon-plus" aria-label="Close"></span>
    </button>
  </h3>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      displayAddBadge: false
    };
  },
  computed: {
    ...mapGetters([
      'isAdmin'
    ])
  },
  methods: {
    toggleAdd() {
      this.displayAddBadge = !this.displayAddBadge;
    }
  }
}
</script>