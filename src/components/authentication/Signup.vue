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
        <input type="password"
               class="form-control"
               placeholder="Password Confirmation"
               v-model="credentials.passwordConfirmation">
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
      <div class="form-group">
        <button class="btn btn-primary" @click="submit()">Signup</button>
      </div>
      <a href="#" @click="toggle()">Already have an account?</a>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      credentials: {
        email: '',
        password: '',
        passwordConfirmation: '',
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
      if (this.credentials.password != this.credentials.passwordConfirmation) {
        this.error = 'Passwords don\'t match';
        return;
      }

      let credentials = {
        email: this.credentials.email,
        password: this.credentials.password,
        firstname: this.credentials.firstname,
        lastname: this.credentials.lastname,
        role: this.credentials.role
      }
    
      this.$store.dispatch('signup', credentials)
        .then(() => {
          this.error = '';
        })
        .catch((err) => {
          this.error = 'Error creating your account. All fields are required';
        });
    },
    toggle() {
      this.$emit('toggle-create');
    }
  }
}
</script>
