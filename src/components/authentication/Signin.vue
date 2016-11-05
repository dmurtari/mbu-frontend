<template>
  <div class="container dropdown-form">
    <div v-if="!createAccount" class="form-wrapper">
      <h5>Login to your account</h5>
      <login-form class="login-form"
                  @toggle-create="toggleCreate()"></login-form>
    </div>
    <div v-if="createAccount" class="form-wrapper">
      <h5>Create your account</h5>
      <signup-form class="signup-form"
                   @toggle-create="toggleCreate()"></signup-form>
    </div>
  </div>
</template>

<script>
import Login from './Login.vue';
import Signup from './Signup.vue';

export default {
  data() {
    return {
      createAccount: false
    }
  },
  methods: {
    toggleCreate() {
      this.createAccount = !this.createAccount;
    }
  },
  components: {
    'login-form': Login,
    'signup-form': Signup
  }
}
</script>

<style scoped lang="sass">
.container .dropdown-form {
  max-width: 400px;
  
}

.login-form, .signup-form {
  padding-top: .5em;
  padding-bottom: .5em;
}

.form-wrapper {
  padding-bottom: 1em;
}
</style>
