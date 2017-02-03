<template>
  <div>
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
  methods: {
    cancel() {
      this.$emit('cancel');
    },
    registerScout() {
      this.creating = true;
      this.$store.dispatch('addRegistration', {
        scoutId: this.scout.id,
        eventId: this.eventId
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