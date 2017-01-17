<template>
  <div class="box">
    <div class="level">
      <div class="level-left">
        <h4 class="title is-4 level-item">{{ badge.name }}</h4>
      </div>
      <div class="level-right">
        <button class="button level-item"
                v-if="isAdmin"
                @click="toggleEdit()"
                title="Edit">
          <span class="fa fa-edit"></span>
        </button>
      </div>
    </div>
    <badge-detail v-if="!displayEditBadge" :badge="badge"></badge-detail>
    <badge-edit v-if="displayEditBadge" 
                :badge="badge"
                @close="toggleEdit()"></badge-edit>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Detail from './Detail.vue';
import Edit from './Edit.vue';

export default {
  props: {
    badge: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
      displayEditBadge: false
    };
  },
  computed: {
    ...mapGetters([
      'isAdmin'
    ])
  },
  methods: {
    toggleEdit() {
      this.displayEditBadge = !this.displayEditBadge;
    }
  },
  components: {
    'badge-detail': Detail,
    'badge-edit': Edit
  }
}
</script>