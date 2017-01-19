<template>
<div class="badge-row row">
  <b class="col-sm-2 col-xs-3">{{ badge.name }}</b>
  <div v-if="offered && !editing" class="col-xs-8 col-sm-10 row">
    <div class="col-sm-4 offering-detail"><b>Periods offered: </b>{{ periods }}</div>
    <div class="col-sm-4 offering-detail"><b>Duration: </b>{{ badge.duration + ' ' + durationLabel }}</div>
    <div class="col-sm-3 offering-detail"><b>Price: </b>${{ badge.price }}</div>
    <div class="col-sm-1">
      <button class="btn btn-default offering-detail"
              v-if="isAdmin"
              @click="toggleEdit()"
              data-toggle="tooltip" 
              data-placement="top" 
              title="Edit">
        <span class="glyphicon glyphicon-edit" aria-label="Edit"></span>
      </button>
    </div>
  </div>
  <edit-offering class="col-sm-10 col-xs-8" 
                 :badge="badge"
                 :eventId="eventId"
                 v-if="offered && editing"
                 @cancel="toggleEdit()"></edit-offering>
  <button v-if="!offered"
          class="btn btn-success"
          @click="createOffering">
    {{ creating ? 'Creating Offering...' : 'Offer this Badge' }}
  </button>
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
      error: ''
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
    createOffering() {
      this.creating = true;

      let offering = {
        badge_id: this.badge.badge_id,
        offering: {
          duration: 1,
          periods: [1, 2, 3]
        }
      };

      this.$store.dispatch('createOffering', {
        eventId: this.eventId,
        details: offering
      })
        .then((response) => {
          return this.$store.dispatch('getOfferings', this.eventId);
        })
        .then((response) => {
          this.error = '';
          this.editing = true;
          this.creating = false;
        })
        .catch((err) => {
          this.error = 'Couldn\'t create offering. Please refresh and try again';
        })
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

.offering-detail {
  padding-top: .5em;
  padding-bottom: .5em;
  white-space: nowrap;
}
</style>