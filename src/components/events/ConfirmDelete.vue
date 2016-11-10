<template>
<div class="container-fluid">
  <div class="form-group has-error">
    <label class="control-label" for="eventDeleteConfirm">
      Confirm Deletion (this cannot be undone!)
    </label>
    <input type="text"
           placeholder="Summer 2088"
           class="form-control"
           v-model="enteredText">
    <span class="help-block">
      Enter the semester and year to confirm deletion. This will also remove all
      data associated with this event, including registrations and records.
    </span>
  </div>
  <button class="btn btn-default"
          @click="cancel()">Don't Delete</button>
  <button class="btn btn-danger"
          @click="confirmDelete()">Confirm Deletion</button>
</div>
</template>

<script>
export default {
  props: {
    matchText: {
      type: String,
      required: true
    },
    eventId: {
      required: true
    }
  },
  data() {
    return {
      enteredText: ''
    }
  },
  methods: {
    confirmDelete() {
      if (this.enteredText === this.matchText) {
        this.$store.dispatch('deleteEvent', this.eventId)
          .then(() => {
            this.$store.dispatch('getEvents');
            this.$emit('close');
          });
      }
    },
    cancel() {
      this.$emit('close');
    }
  }
}
</script>