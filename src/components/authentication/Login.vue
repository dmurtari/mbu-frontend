<template>
  <div>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
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
      <div class="btn-group">
        <button class="btn btn-primary" @click="submit()">Login</button>
        <button class="btn btn-default" @click="toggle()">Create an Account</button>
      </div>
    </form>
  </div>
</template>

<script>
 import auth from '../../services/auth';

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
       let credentials = {
         email: this.credentials.email,
         password: this.credentials.password,
       }

       auth.login(this, credentials)
     },
     toggle() {
       this.$emit('toggle-create');
     }
   }
 }
</script>
