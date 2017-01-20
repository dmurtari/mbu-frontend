<template>
  <div class="badge-row is-flex-tablet columns is-multiline">
    <template v-if="editing">
      <edit-offering class="column auto" 
                     :badge="badge"
                     :eventId="eventId"
                     v-if="offered && editing"
                     @cancel="toggleEdit()"></edit-offering>
    </template>
    <template v-if="!editing">
      <b class="column is-2-tablet is-3-desktop">{{ badge.name }}</b>
      <template v-if="offered">
        <div class="column is-4-tablet is-3-desktop offering-detail">
          <b>Periods offered: </b>{{ periods }}
        </div>
        <div class="column is-3-tablet is-3-desktop offering-detail">
          <b>Duration: </b>{{ badge.duration + ' ' + durationLabel }}
        </div>
        <div class="column is-2-tablet is-2-desktop offering-detail">
          <b>Price: </b>${{ badge.price }}
        </div>
        <div class="column is-1" v-if="isAdmin">
          <button class="button is-white offering-detail is-hidden-mobile"
                  @click="toggleEdit()">
            <span class="fa fa-edit" aria-label="Edit"></span>
          </button>
          <button class="button offering-detail is-hidden-tablet"
                  @click="toggleEdit()">
            Edit Offering
          </button>
        </div>
      </template>
      <button v-if="!offered"
              class="button is-success"
              :class="{ 'is-disabled is-loading': creating }"
              @click="createOffering">
        Offer this Badge
      </button>
    </template>
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
      console.log("Toggling")
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
    align-items: center;
  }

  .offering-detail {
    padding-top: .5em;
    padding-bottom: .5em;
    white-space: nowrap;
  }
</style>