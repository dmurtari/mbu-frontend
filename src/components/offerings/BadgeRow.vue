<template>
<div class="badge-row row">
  <b class="col-md-2">{{ badge.name }}</b>
  <span v-if="offered && !editing" class="col-md-10 offering-row">
    <span class="col-md-4 offering-detail"><b>Periods offered: </b>{{ periods }}</span>
    <span class="col-md-4 offering-detail"><b>Duration: </b>{{ badge.duration + ' ' + durationLabel }}</span>
    <span class="col-md-3 offering-detail"><b>Price: </b>${{ badge.price }}</span>
    <span class="col-md-1">
      <button class="btn btn-default"
              v-if="isAdmin"
              @click="toggleEdit()"
              data-toggle="tooltip" 
              data-placement="top" 
              title="Edit">
        <span class="glyphicon glyphicon-edit" aria-label="Edit"></span>
      </button>
    </span>
  </span>
  <edit-offering class="col-md-10" 
                 :badge="badge"
                 :eventId="eventId"
                 v-if="editing"
                 @cancel="toggleEdit()"></edit-offering>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

import Edit from './Edit.vue';

export default {
  props: {
    badge: {
      type: Object,
      required: true
    },
    eventId: {
      required: true
    }
  },
  data() {
    return {
      creating: false,
      editing: false,
    };
  },
  computed: {
    ...mapGetters([
      'isAdmin'
    ]),
    durationLabel() {
      return Number(this.badge.duration) == 1 ? 'period ' : 'periods';
    },
    offered() {
      return !_.isEmpty(this.badge.periods);
    },
    periods() {
      return _.join(_.sortBy(this.badge.periods), ', ');
    }
  },
  methods: {
    toggleCreate() {
      this.creating = !this.creating;
    },
    toggleEdit() {
      this.editing = !this.editing;
    }
  },
  components: {
    'edit-offering': Edit
  }
}
</script>

<style lang="sass" scoped>
.badge-row {
  padding-top: 1em;
  padding-bottom: 1em;
  border-bottom: 1px lightgray solid;
  display: flex;
  align-items: center;
}

.offering-row {
  display: flex;
  align-items: center;
}

.offering-detail {
  white-space: nowrap;
}
</style>