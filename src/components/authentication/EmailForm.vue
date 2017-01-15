<template>
  <form>
    <div class="notification is-danger" v-if="error">
      Failed to send the reset email. Please re-enter your email and try again.
    </div>
    <div class="notification is-success" v-if="sent">
      Successfully sent the reset email! Check your inbox and click the link in 
      the message.
    </div>
    <div class="control">
      <label class="label">
        Enter the email you used to create your account
      </label>
      <input type="email"
             class="input"
             v-model="email">
      <span class="help">
        A link to reset your password will be emailed to you from
        no&#8209;reply@apo&#8209;gammatheta.org. Please check your spam folder 
        if you do not see this email. 
      </span>
    </div>
    <button class="button is-primary is-pulled-right"
            :class="{ 'is-disabled is-loading': sending }"
            @click.prevent="sendResetEmail()">
      {{ sent ? 'Resend Email' : 'Send Email' }}
    </button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      error: false,
      sent: false,
      sending: false
    }
  },
  methods: {
    sendResetEmail() {
      this.sending = true;
      this.$store.dispatch('sendResetEmail', this.email)
        .then(() => {
          this.sending = false;
          this.error = false;
          this.sent = true;
        })
        .catch(() => {
          this.sending= false;
          this.sent = false;
          this.error = true;
        });
    }
  }
}
</script>

<style lang="sass" scoped>
.help {
  font-size: 1rem;
}
</style>