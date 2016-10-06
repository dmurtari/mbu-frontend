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
    <button class="btn btn-primary" @click="submit()">Login</button>
  </div>
</template>

<script>
 import auth from '../auth';

 export default {
   data() {
     return {
       credentials: {
         email: '',
         password: ''
       },
       error: ''
     }
   },
   methods: {
     submit() {
       var credentials = {
         email: this.credentials.email,
         password: this.credentials.password,
       }

       auth.login(this, credentials)
     }
   }
 }
</script>
