<template>
<div>
  <form class="form-horizontal" v-if="!reset">
    <div class="alert alert-danger" v-if="error">
      {{ error }}
    </div>
    <span class="help-block">
      Enter the new password you would like to use to login to your account.
    </span>
    <div class="form-group">
      <label class="control-label col-sm-3">
        New password
      </label>
      <div class="col-sm-9">
        <input type="password"
              class="form-control"
              v-model="password">
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-3">
        Confirm your password
      </label>
      <div class="col-sm-9">
        <input type="password"
              class="form-control"
              v-model="passwordConfirmation">
      </div>
    </div>
    <button class="btn btn-primary pull-right"
            @click="resetPassword()">
            Set Password
    </button>
  </form>
  <div v-if="true">
    <div class="alert alert-success">
      Successfully reset your password! Please login to your account using your
      new password.
    </div>
    <login-form @loginSuccess="loginSuccess()"></login-form>
  </div>
</div>
</template>

<script>
import Login from './Login.vue';

export default {
  data() {
    return {
      password: '',
      passwordConfirmation: '',
      error: '',
      reset: false
    }
  },
  computed: {
    resetToken() {
      return this.$route.params.resetToken;
    }
  },
  methods: {
    resetPassword() {
      if (this.password != this.passwordConfirmation) {
        this.error = 'Passwords don\'t match';
        return;
      }
      let data = {
        password: this.password,
        token: this.resetToken
      };
      console.log('sending', data)
      this.$store.dispatch('resetPassword', data)
        .then(() => {
          this.password = '';
          this.passwordConfirmation = '';
          this.reset = true;
        })
        .catch((err) => {
          this.reset = false;
          this.error = 'Failed to reset password. Please try again.';
        });
    },
    loginSuccess() {
      console.log('redirecting');
      this.$router.push({ 
        name: 'home'
      });
    }
  },
  components: {
    'login-form': Login
  }
}
</script>