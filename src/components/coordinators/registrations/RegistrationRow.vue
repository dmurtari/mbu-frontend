<template>
  <div class="registration-row is-flex-tablet columns is-multiline">
    <b class="column is-3">{{ scout.fullname }}</b>
      <button class="button is-link"
              v-if="!registered"
              :class="{ 'is-disabled is-loading': creating }"
              @click="registerScout()">
        Register Scout for This Event
      </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash';

export default {
  props: {
    scout: {
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
      error: ''
    };
  },
  computed: {
    ...mapGetters([
      'events'
    ]),
    registered() {
      return _.find(this.scout.registrations, { 'event_id': this.eventId });
    }
  },
  methods: {
    registerScout() {
      this.creating = true;
      this.$store.dispatch('addRegistration', {
        scoutId: this.scout.id,
        eventId: this.eventId
      })
        .then(() => {
          this.creating = false;
        })
        .catch(() => {
          this.creating = false;
          this.error = 'Failed to register scout for this event.';
        })

    }
  }
}
</script>

<style lang="sass" scoped>
  .registration-row {
    padding-top: 1em;
    padding-bottom: 1em;
    border-bottom: 1px lightgray solid;
  }
</style>