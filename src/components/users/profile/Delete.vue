<template>
<div>
  <div class="alert alert-danger" v-if="error">
    <p>{{ error }}</p>
  </div>
  <confirm-delete :match-text="this.firstname + ' ' + this.lastname"
                  :placeholder="'Full Name'"
                  @deleteSuccess="confirmDelete()"
                  @close="cancel()">
    <span slot="header">
      Do you really want to delete your account? This cannot be undone
    </span>
    <span slot="help-text">
      Enter your full name (capitalization matters) to confirm deleting your 
      account. <b v-if="role==='admin'">This will also remove all of the 
      scouts that you registered, as well as their registrations and completion 
      records!</b>
    </span>
  </confirm-delete>
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
      error: ''
    };
  },
  methods: {
    confirmDelete() {
      this.$store.dispatch('deleteAccount', this.id)
        .then(() => {
          this.error = '';
          this.$router.push('/');
        })
        .catch((err) => {
          this.error = 'Couldn\'t delete your account. Please contact an administrator';
        });
    },
    cancel() {
      this.error = '';
      this.$emit('toggle');
    }
  }
}
</script>