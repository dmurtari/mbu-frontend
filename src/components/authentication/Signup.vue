<template>
  <div class="section">
    <div class="column is-8 is-offset-2">
      <h1 class="title">Create Your Account</h1>
      <h3 class="subtitle">
        Welcome to MBU Online! Create your account here to be able to use all 
        of the features of this website.
      </h3>
      <div class="notification is-warning" v-if="error">
        <button class="delete" @click.prevent="dismissError()"></button>
        <p>{{ error }}</p>
      </div>
      <form class="columns is-multiline">
        <div class="control column is-12">
          <label class="label" for="signup-email">Email</label>
          <input type="email"
                  class="input"
                  id="signup-email"
                  placeholder="Your email address"
                  v-model="credentials.email">
        </div>
        <div class="control column is-half">
          <label class="label" for="signup-password">Password</label>
          <input type="password"
                  class="input"
                  id="signup-password"
                  placeholder="Password"
                  v-model="credentials.password">
        </div>
        <div class="control column is-half">
          <label class="label" for="signup-password-confirm">Password Confirmation</label>
          <input type="password"
                  class="input"
                  id="signup-password-confirm"
                  placeholder="Confirm your password"
                  v-model="credentials.passwordConfirmation">
        </div>
        <div class="control column is-half">
          <label class="label" for="signup-first-name">First Name</label>
          <input type="text"
                  class="input"
                  id="signup-first-name"
                  placeholder="First Name"
                  v-model="credentials.firstname">
        </div>
        <div class="control column is-half">
          <label class="label" for="signup-last-name">Last Name</label>
          <input type="text"
                  class="input"
                  id="signup-last-name"
                  placeholder="Last Name"
                  v-model="credentials.lastname">
        </div>
        <div class="control column is-12">
          <label class="label" for="signup-role">I am a...</label>
          <span class="select">
            <select class="input" 
                    id="signup-role"
                    v-model="credentials.role">
              <option v-for="option in roles" :value="option.value">
                {{ option.text }}
              </option>
            </select>
          </span>
        </div>
        <div class="column is-12" v-if="credentials.role === 'coordinator'">
          <div class="columns">
            <div class="control column is-one-third">
              <label class="label" for="signup-troop">Troop</label>
              <input type="number"
                    class="input"
                    id="signup-troop"
                    placeholder="Troop"
                    v-model="credentials.coordinator.troop">
            </div>
            <div class="control column is-one-third">
              <label class="label" for="signup-district">District</label>
              <input type="text"
                    class="input"
                    id="signup-district"
                    placeholder="District"
                    v-model="credentials.coordinator.district">
            </div>
            <div class="control column is-one-third">
              <label class="label" for="signup-council">Council</label>
              <input type="text"
                    class="input"
                    id="signup-council"
                    placeholder="Council"
                    v-model="credentials.coordinator.council">
            </div>
          </div>
        </div>
        <div class="control column is-12" v-if="credentials.role === 'teacher'">
          <div>
            <label class="label" for="signup-chapter">Chapter/Organization</label>
            <input type="text"
                   class="input"
                   id="signup-chapter"
                   placeholder="Your group"
                   v-model="credentials.teacher.chapter">
          </div>
        </div>
        <div class="control column is-12">
          <button class="button is-primary" @click.prevent="submit()">Signup</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, sameAs, minLength, alpha } from 'vuelidate/lib/validators'

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
    dismissError() {
      this.error = '';
    },
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
  },
  validations: {
    credentials: {
      email: {
        required,
        email
      },
      password: {
        required,
        minLength: minLength(8)
      },
      passwordConfirmation: {
        sameAs: sameAs('credentials.password')
      },
      firstname: {
        required,
        alpha
      },
      lastname: {
        required,
        alpha
      }
    }
  }
}
</script>

<style lang="sass">
.column .columns {
    margin-bottom: -0.75rem;
}
</style>