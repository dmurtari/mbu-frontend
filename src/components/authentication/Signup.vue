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
      <div class="form-group">
        <input type="text"
               class="form-control"
               placeholder="First Name"
               v-model="credentials.firstname">
      </div>
      <div class="form-group">
        <input type="text"
               class="form-control"
               placeholder="Last Name"
               v-model="credentials.lastname">
      </div>
      <div class="form-group">
        <select class="form-control" v-model="credentials.role">
          <option v-for="option in roles" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <button class="btn btn-primary" @click="submit()">Create my Account</button>
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
         password: '',
         firstname: '',
         lastname: '',
         role: ''
       },
       roles: [
         { text: 'Unaffailiated', value: 'anonymous' },
         { text: 'Scoutmaster/Coordinator', value: 'coordinator' },
         { text: 'Teacher/Volunteer', value: 'teacher' }
       ],
       error: ''
     }
   },
   methods: {
     submit() {
       let credentials = {
         email: this.credentials.email,
         password: this.credentials.password,
         firstname: this.credentials.firstname,
         lastname: this.credentials.lastname,
         role: this.credentials.role
       }

       auth.signup(this, credentials)
     }
   }
 }
</script>
