<template>
<div class="panel panel-default">
  <div class="panel-heading">
    <div class="btn-group pull-right">
      <button class="btn btn-default"
              v-if="isAdmin"
              @click="toggleEdit()"
              data-toggle="tooltip" 
              data-placement="top" 
              title="Edit">
        <span class="glyphicon glyphicon-edit" aria-label="Edit"></span>
      </button>
    </div>
    <h4>{{ badge.name }}</h4>
  </div>
  <div class="panel-body">
    <badge-detail v-if="!displayEditBadge" :badge="badge"></badge-detail>
    <badge-edit v-if="displayEditBadge" 
                :badge="badge"
                @close="toggleEdit()"></badge-edit>
  </div>
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