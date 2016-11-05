<template>
<div class="container">
  <div class="form-group has-error">
    <label class="control-label" for="eventDeleteConfirm">
      Confirm Deletion (this cannot be undone!)
    </label>
    <input type="text"
           placeholder="Summer 2088"
           class="form-control"
           v-model="enteredText">
    <span class="help-block">
      Enter the semester and year to confirm deletion.
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
        console.log('Deleting');
      }
    },
    cancel() {
      this.$emit('cancel');
    }
  }
}
</script>