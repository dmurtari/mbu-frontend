<template>
<div class="form-group has-error">
  <label class="control-label" for="userDeleteConfirm">
      Do you really want to delete your account? This cannot be undone!
  </label>
  <div class="alert alert-danger" v-if="error">
    <p>{{ error }}</p>
  </div>
  <input type="text"
         id="userDeleteConfirm"
         placeholder="Full Name"
         class="form-control"
         v-model="enteredText">
  <span class="help-block">
    Enter your full name (capitalization matters) to confirm deleting your 
    account. <b v-if="role==='admin'">This will also remove all of the 
    scouts that you registered, as well as their registrations and completion 
    records!</b>
  </span>
  <div class="pull-right delete-buttons">
    <button class="btn btn-default"
            @click="cancel()">Don't Delete</button>
    <button class="btn btn-danger"
            @click="confirmDelete()">Confirm Deletion</button>
  </div>
</div>
</template>

<script>
export default {
  props: {
    firstname: {
      type: String,
      required: true
    },
    lastname: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    id: {
      required: true
    }
  },
  data() {
    return {
      enteredText: '',
      error: ''
    }
  },
  methods: {
    confirmDelete() {
      if (this.enteredText === this.firstname + ' ' + this.lastname) {
        this.$store.dispatch('deleteAccount', this.id)
          .then(() => {
            this.error = '';
            this.$router.push('/');
          })
          .catch((err) => {
            this.error = 'Couldn\'t delete your account. Please contact an administrator';
          })
      } else {
        this.error = 'Please enter your full name to confirm that you wish to delete your account';
      }
    },
    cancel() {
      this.$emit('toggle');
    }
  }
}
</script>

<style lang="sass">
#userDeleteConfirm {
  margin-top: 1em;
  margin-bottom: 1em;
}

.delete-buttons {
  margin-top: 1em;
}
</style>