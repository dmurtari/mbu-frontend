<template>
  <div class="container">
    <div class="notification is-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <h5 class="title is-5">Add Merit Badge Preferences for {{ scout.fullname }}</h5>
    <div class="columns is-multiline">

    </div>
    <button class="button is-primary"
            :class="{ 'is-disabled is-loading': creating }"
            @click="registerScout()">
      Register Scout
    </button>
    <button class="button"
            @click="cancel()">
      Cancel
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    scout: {
      type: Object,
      required: true
    },
    event: {
      type: Object,
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
    offerings() {
      return _.orderBy(this.event.offerings, 'name');
    }
  },
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    registerScout() {
      this.creating = true;
      this.$store.dispatch('addRegistration', {
        scoutId: this.scout.id,
        eventId: this.event.id
      })
        .then(() => {
          this.creating = false;
          this.$emit('created', projectedCost);
        })
        .catch(() => {
          this.creating = false;
          this.error = 'Failed to register scout for this event.';
        });
    }
  }
}
</script>