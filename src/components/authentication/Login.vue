<template>
  <div class="container">
    <div class="column is-half is-offset-one-quarter">
      <h1 class="title">Login</h1>
      <h3 class="subtitle">Welcome back to MBU Online!</h3>
      <div class="notification is-warning" v-if="error">
        <button class="delete" @click.prevent="dismissError()"></button>
        <p>Invalid email/password combination</p>
      </div>
      <div class="notification is-success" 
          v-if="$route.query.from === 'resetSuccess'">
        <p>
          Successfully reset your password! Please login to your account with 
          using new password.
        </p>
      </div>
      <form>
        <div class="control">
          <label class="label" for="login-email">Email</label>
          <input type="email"
                class="input"
                id="login-email"
                placeholder="Enter your email"
                :class="{ 'is-danger': $v.credentials.email.$error }"
                @blur="$v.credentials.email.$touch"
                v-model="credentials.email">
          <span v-if="$v.credentials.email.$error">
            <span class="help is-danger" v-if="!$v.credentials.email.email">
              Email address is invalid
            </span>
            <span class="help is-danger" v-if="!$v.credentials.email.required">
              Email is required
            </span>
          </span>
        </div>
        <div class="control">
          <label class="label" for="login-password">Password</label>
          <input type="password"
                class="input"
                id="login-password"
                placeholder="Password"
                :class="{ 'is-danger': $v.credentials.password.$error }"
                @blur="$v.credentials.password.$touch"
                v-model="credentials.password">
          <span class="help is-danger" 
                v-if="!$v.credentials.password.required && $v.credentials.password.$error">
            Password is required
          </span>
        </div>
        <div class="control">
          <button class="button is-primary" 
                  :disabled="$v.credentials.$invalid"
                  @click.prevent="submit()">Login</button>
          <button class="button is-info is-outlined" 
                  @click.prevent="signup()">Create an Account</button>
          <router-link class="button is-link is-pulled-right" to="/reset">Forgot your password?</router-link>
        </div>
        <br>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: ''
      },
      error: false
    }
  },
  methods: {
    dismissError() {
      this.$v.$reset();
      this.error = '';
    },
    submit() {
      let credentials = {
        email: this.credentials.email,
        password: this.credentials.password,
      }
      
      this.$store.dispatch('login', credentials)
        .then(() => {
          this.error = false;
          this.$router.push('/');
        })
        .catch((err) => {
          this.error = true;
        });
    },
    signup() {
      this.$emit('close');
      this.$router.push('/signup');
    },
    reset() {
      this.$emit('close');
      this.$router.push('/reset');
    }
  },
  validations: {
    credentials: {
      email: {
        required,
        email
      },
      password: {
        required
      }
    }
  }
}
</script>

<style scoped lang="sass">

a {
  cursor: pointer;
}

</style>
