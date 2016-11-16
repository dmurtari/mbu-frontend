<template>
  <div class="container col-md-6 col-md-offset-3">
    <h3>Create Your Account</h3>
    <p>
      Create an account to register scouts for MBU here! You will be able to use
      this account to register scouts for MBU, and view results from current and
      previous MBUs.
    </p>
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <form>
      <div class="form-group">
        <label for="signup-email">Email</label>
        <input type="email"
               class="form-control"
               id="signup-email"
               placeholder="Your email address"
               v-model="credentials.email">
      </div>
      <div class="row">
        <div class="form-group col-sm-6">
          <label for="signup-password">Password</label>
          <input type="password"
                class="form-control"
                id="signup-password"
                placeholder="Password"
                v-model="credentials.password">
        </div>
        <div class="form-group col-sm-6">
          <label for="signup-password-confirm">Password Confirmation</label>
          <input type="password"
                class="form-control"
                id="signup-password-confirm"
                placeholder="Confirm your password"
                v-model="credentials.passwordConfirmation">
        </div>
      </div>
      <div class="row">
        <div class="form-group col-sm-6">
          <label for="signup-first-name">First Name</label>
          <input type="text"
                class="form-control"
                id="signup-first-name"
                placeholder="First Name"
                v-model="credentials.firstname">
        </div>
        <div class="form-group col-sm-6">
          <label for="signup-last-name">Last Name</label>
          <input type="text"
                class="form-control"
                id="signup-last-name"
                placeholder="Last Name"
                v-model="credentials.lastname">
        </div>
      </div>
      <div class="form-group">
        <label for="signup-role">I am a...</label>
        <select class="form-control" 
                id="signup-role"
                v-model="credentials.role">
          <option v-for="option in roles" :value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="row" v-if="credentials.role === 'coordinator'">
        <div class="form-group col-sm-4">
          <label for="signup-troop">Troop</label>
          <input type="number"
                 class="form-control"
                 id="signup-troop"
                 placeholder="Troop"
                 v-model="credentials.coordinator.troop">
        </div>
        <div class="form-group col-sm-4">
          <label for="signup-district">District</label>
          <input type="text"
                 class="form-control"
                 id="signup-district"
                 placeholder="District"
                 v-model="credentials.coordinator.district">
        </div>
        <div class="form-group col-sm-4">
          <label for="signup-council">Council</label>
          <input type="text"
                 class="form-control"
                 id="signup-council"
                 placeholder="Council"
                 v-model="credentials.coordinator.council">
        </div>
      </div>
      <div v-if="credentials.role === 'teacher'">
        <div class="form-group">
          <label for="signup-chapter">Chapter/Organization</label>
          <input type="text"
                 class="form-control"
                 id="signup-chapter"
                 placeholder="Your group"
                 v-model="credentials.teacher.chapter">
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary" @click="submit()">Signup</button>
      </div>
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
        role: '',
        teacher: {
          chapter: ''
        },
        coordinator: {
          troop: '',
          district: '',
          council: ''
        }
      },
      roles: [
        { text: 'Other', value: 'anonymous' },
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

      switch (credentials.role){
        case 'coordinator':
          credentials.details = this.credentials.coordinator;
          break;
        case 'teacher':
          credentials.details = this.credentials.teacher;
          break;
      }

      this.$store.dispatch('signup', credentials)
        .then(() => {
          this.$router.push('/');
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
