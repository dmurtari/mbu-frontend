<template>
  <div class="badge-row is-flex-tablet columns is-multiline">
    <template v-if="shouldShowEdit">
      <edit-offering class="column auto"
                     :badge="badge"
                     :eventId="eventId"
                     :creating="creating"
                     @cancel="cancelEdit()"></edit-offering>
    </template>
    <template v-if="!shouldShowEdit">
      <div class="column is-11">
        <h5 class="title is-5">{{ badge.name }}</h5>
      </div>
      <div class="column is-1" v-if="isAdmin && offered">
          <button class="button is-white offering-detail is-hidden-mobile"
                  @click="toggleEdit()">
            <span class="fa fa-edit" aria-label="Edit"></span>
          </button>
          <button class="button offering-detail is-hidden-tablet"
                  @click="toggleEdit()">
            Edit Offering
          </button>
        </div>
      <template v-if="offered">
        <div class="column is-4 offering-detail">
          <b>Periods offered: </b>{{ periods }}
        </div>
        <div class="column is-4 offering-detail">
          <b>Duration: </b>{{ badge.duration + ' ' + durationLabel }}
        </div>
        <div class="column is-4 offering-detail">
          <b>Price: </b>{{ offeringPrice }}
        </div>
        <div class="column is-6 offering-detail">
          <b>Requirements: </b>{{ requirements }}
        </div>
      </template>
      <div class="field" v-if="!offered">
        <div class="control">
          <button class="button is-success create-button"
                  :class="{ 'is-loading': creating }"
                  :disabled="creating"
                  @click="createOffering()">
            Offer this Badge
          </button>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import accounting from 'accounting';

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
    offeringPrice() {
      return accounting.formatMoney(this.badge.price);
    },
    periods() {
      return _.join(_.sortBy(this.badge.periods), ', ');
    },
    requirements() {
      if (this.badge.requirements.length < 1) {
        return 'None listed';
      } else {
        return _.join(_.sortBy(this.badge.requirements), ', ');
      }
    },
    shouldShowEdit() {
      return this.editing || this.creating;
    }
  },
  watch: {
    badge()  {
      this.editing = false;
    }
  },
  methods: {
    createOffering() {
      this.creating = true;
    },
    cancelEdit() {
      this.creating = false;
      this.editing = false;
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

<style lang="scss" scoped>
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

  .create-button {
    margin-left: 1rem;
    margin-top: 1rem;
  }
</style>
