<template>
  <div>
    <div class="alert alert-danger" v-if="error">
      <p>Invalid email/password combination</p>
    </div>
    <form>
      <div class="form-group">
        <label for="login-email">Email</label>
        <input type="email"
               class="form-control"
               id="login-email"
               placeholder="Enter your email"
               v-model="credentials.email">
      </div>
      <div class="form-group">
        <label for="loginPassword">Password</label>
        <input type="password"
               class="form-control"
               id="loginPassword"
               placeholder="Password"
               v-model="credentials.password">
      </div>
      <div class="btn-group form-group">
        <button class="btn btn-primary" 
                @click="submit()">Login</button>
        <button class="btn btn-default" 
                @click="signup()">Create an Account</button>
      </div>
      <br>
      <a @click="reset()">Forgot your password?</a>
    </form>
  </div>
</template>

<script>
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
    submit() {
      let credentials = {
        email: this.credentials.email,
        password: this.credentials.password,
      }
      
      this.$store.dispatch('login', credentials)
        .then(() => {
          this.$emit('loginSuccess');
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
  }
}
</script>

<style scoped lang="sass">

a {
  cursor: pointer;
}

</style>
