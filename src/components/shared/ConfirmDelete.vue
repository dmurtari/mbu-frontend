<template>
  <div>
    <div class="control">
      <label class="label" for="delete-confirm">
        <slot name="header"></slot>
      </label>
      <div class="notification is-danger" v-if="error">
        <p>{{ error }}</p>
      </div>
      <input type="text"
             :placeholder="placeholder"
             class="input"
             id="delete-confirm"
             v-model="enteredText">
      <span class="help">
        <slot name="help-text"></slot>
      </span>
    </div>
    <button class="button"
            @click.prevent="cancel()">Don't Delete</button>
    <button class="button is-danger"
            :disabled="enteredText != matchText"
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

<style lang="sass" scoped>
.help {
  font-size: 1rem;
}
</style>