<template>
<form>
  <div class="alert alert-danger" v-if="error">
    Failed to send the reset email. Please re-enter your email and try again.
  </div>
  <div class="alert alert-success" v-if="sent">
    Successfully sent the reset email! Check your inbox and click the link in 
    the message.
  </div>
  <div class="form-group">
    <label class="control-label">
      Enter the email you used to create your account
    </label>
    <input type="email"
           class="form-control"
           v-model="email">
    <span class="help-block">
      A link to reset your password will be emailed to you from
      no&#8209;reply@apo&#8209;gammatheta.org. Please check your spam folder 
      if you do not see this email. 
    </span>
    <button class="btn btn-primary pull-right"
            :class="{ 'disabled': clicked }"
            @click="sendResetEmail()">
            {{ clicked ? 'Sending Email...' : 'Send Email' }}
    </button>
  </div>
</form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      error: false,
      sent: false,
      clicked: false
    }
  },
  methods: {
    sendResetEmail() {
      this.clicked = true;
      this.$store.dispatch('sendResetEmail', this.email)
        .then(() => {
          this.clicked = false;
          this.error = false;
          this.sent = true;
        })
        .catch(() => {
          this.clicked= false;
          this.sent = false;
          this.error = true;
        });
    }
  }
}
</script>