<template>
<div>
  <div class="form-group has-error">
    <label class="control-label" for="delete-confirm">
      <slot name="header"></slot>
    </label>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <input type="text"
           :placeholder="placeholder"
           class="form-control"
           id="delete-confirm"
           v-model="enteredText">
    <span class="help-block">
      <slot name="help-text"></slot>
    </span>
  </div>
  <button class="btn btn-default"
          @click.prevent="cancel()">Don't Delete</button>
  <button class="btn btn-danger"
          @click.prevent="confirmDelete()">Confirm Deletion</button>
</div>
</template>

<script>
export default {
  props: {
    matchText: {
      type: String,
      required: true
    },
    placeholder: String
  },
  data() {
    return {
      enteredText: '',
      error: ''
    }
  },
  methods: {
    confirmDelete() {
      if (this.enteredText === this.matchText) {
        this.error = '';
        this.$emit('deleteSuccess');
      } else {
        this.error = 'The text you entered doesn\'t match the required text.'
      }
    },
    cancel() {
      this.error = '';
      this.$emit('close');
    }
  }
}
</script>