<template>
  <div>
    <form>
      <div class="notification is-danger" v-if="error">
        {{ error }}
      </div>
      <p class="subtitle">
        Enter the new password you would like to use to login to your account.
      </p>
      <div class="control">
        <label class="label" for="reset-password">
          New password
        </label>
        <input type="password"
               class="input"
               id="reset-password"
               @blur="$v.password.$touch"
               :class="{ 'is-danger': $v.password.$error }"
               v-model="password" required>
        <span v-if="$v.password.$error">
          <span class="help is-danger" v-if="!$v.password.minLength">
            Password must be at least 8 characters long
          </span>
          <span class="help is-danger" v-if="!$v.password.required">
            Please provide your new password
          </span>
        </span>
      </div>
      <div class="control">
        <label class="label" for="reset-confirm">
          Confirm your password
        </label>
        <div class="col-sm-9">
          <input type="password"
                 class="input"
                 id="reset-confirm"
                 @blur="$v.passwordConfirmation.$touch"
                 :class="{ 'is-danger': $v.passwordConfirmation.$error }"
                 v-model="passwordConfirmation" required>
          <span v-if="$v.passwordConfirmation.$error">
            <span class="help is-danger" v-if="!$v.passwordConfirmation.sameAs">
              Passwords do not match
            </span>
            <span class="help is-danger" v-if="!$v.passwordConfirmation.required">
              Please confirm your new password
            </span>
          </span>
        </div>
      </div>
      <button class="button is-primary is-pulled-right"
              :class="{ 'is-disabled is-loading': sending }"
              :disabled="$v.$invalid"
              @click.prevent="resetPassword()">
              Set Password
      </button>
    </form>
  </div>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

import Login from './Login.vue';

export default {
  data() {
    return {
      password: '',
      passwordConfirmation: '',
      error: '',
      sending: false
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

      this.sending = true;

      this.$store.dispatch('resetPassword', data)
        .then(() => {
          this.password = '';
          this.passwordConfirmation = '';
          this.sending = false;
          this.$router.replace({
            path: '/login',
            query: { from: 'resetSuccess' }
          });
        })
        .catch((err) => {
          this.sending = false;
          this.error = 'Failed to reset password. Please try again.';
        });
    }
  },
  components: {
    'login-form': Login
  },
  validations: {
    password: {
      required,
      minLength: minLength(8)
    },
    passwordConfirmation: {
      required,
      sameAs: sameAs('password')
    }
  }
}
</script>