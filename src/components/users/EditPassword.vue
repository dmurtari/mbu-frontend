<template>
<div class="col-lg-offset-2 col-lg-8">
  <form class="form-horizontal">
    <span class="help-block text-center">
      Enter the new password you would like to use to login to your account.
    </span>
    <div class="alert alert-danger" v-if="error">
      {{ error }}
    </div>
    <div class="form-group">
      <label class="control-label col-sm-5">
        New Password
      </label>
      <div class="col-sm-7">
        <input type="password"
              class="form-control"
              v-model="password">
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-5">
        Confirm Password
      </label>
      <div class="col-sm-7">
        <input type="password"
              class="form-control"
              v-model="passwordConfirmation">
      </div>
    </div>
    <div class="form-group pull-right col-md-12">
      <button class="btn btn-primary" 
              :class="{ 'disabled': saving }"
              @click.prevent="update()">
        {{ saving ? 'Saving Password...' : 'Save Password' }}
      </button>
    </div>
  </form>
</div>
</template>

<script>
export default {
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      password: '',
      passwordConfirmation: '',
      error: '',
      saving: false
    }
  },
  methods: {
    update() {
      if (this.password != this.passwordConfirmation) {
        this.error = 'Passwords must match';
        return;
      }

      let data = {
        id: this.id,
        password: this.password
      }

      this.saving = true;
      this.$store.dispatch('updateProfile', data)
        .then(() => {
          this.saving = false;
          this.error = '';
          this.$emit('toggle');
        })
        .catch((err) => {
          this.saving = false;
          this.error = 'Failed to reset password. Please try again.';
        });
    }
  }
}
</script>