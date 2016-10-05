<template>
  <div>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
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
    <div class="form-group">
      <input type="text"
             class="form-control"
             placeholder="Firstname"
             v-model="credentials.firstname">
    </div>
    <div class="form-group">
      <input type="text"
             class="form-control"
             placeholder="Lastname"
             v-model="credentials.lastname">
    </div>
    <div class="form-group">
      <input type="text"
             class="form-control"
             placeholder="Role"
             v-model="credentials.role">
    </div>
    <button class="btn btn-primary" @click="submit()">Create my Account</button>
  </div>
</template>

<script>
import auth from '../auth';

export default {
  data() {
    return {
      credentials: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        role: ''
      },
      error: ''
    }
  },
  methods: {
    submit() {
      var credentials = {
        email: this.email,
        password: this.password,
        firstname: this.firstname,
        lastname: this.lastname,
        role: this.role
      }

      auth.signup(this, credentials)
    }
  }
}
</script>
