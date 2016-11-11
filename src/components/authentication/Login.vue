<template>
  <div>
    <div class="alert alert-danger" v-if="error">
      <p>Invalid email/password combination</p>
    </div>
    <form>
      <div class="form-group">
        <input type="email"
               class="form-control"
               placeholder="Email"
               v-model="credentials.email">
      </div>
      <div class="form-group">
        <input type="password"
               class="form-control"
               placeholder="Password"
               v-model="credentials.password">
      </div>
      <div class="btn-group form-group">
        <button class="btn btn-primary" @click="submit()">Login</button>
        <button class="btn btn-default" @click="toggle()">Create an Account</button>
      </div>
      <br>
      <router-link to="/reset">Forgot your password?</router-link>
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
    toggle() {
      this.$emit('toggle-create');
    }
  }
}
</script>
