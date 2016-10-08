<template>
  <div class="container dropdown-form">
    <div v-if="!createAccount" class="form-wrapper">
      <h5>Login to your account</h5>
      <login-form class="login-form"></login-form>
      <a href="#" @click="toggleCreate">Don't have an account?</a>
    </div>
    <div v-if="createAccount" class="form-wrapper">
      <h5>Create your account</h5>
      <signup-form class="signup-form"></signup-form>
      <a href="#" @click="toggleCreate">Already have an account?</a>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style scoped lang="sass">
.container .dropdown-form {
  max-width: 400px;
  
}

.login-form, .signup-form {
  padding-bottom: .5em;
}

.form-wrapper {
  padding-top: 1em;
  padding-bottom: 1em;
}
</style>
