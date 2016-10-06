<template>
  <div class="container">
    <div v-if="!createAccount">
      <login-form></login-form>
      <a @click="toggleCreate">Don't have an account?</a>
    </div>
    <div v-if="createAccount">
      <signup-form></signup-form>
      <a @click="toggleCreate">Have an account?</a>
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
