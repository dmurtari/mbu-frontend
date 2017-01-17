<template>
  <div>
    <change-password :sending="sending"
                     :error="error"
                     @resetPassword="resetPassword($event)"></change-password>
  </div>
</template>

<script>
import { required, sameAs, minLength } from 'vuelidate/lib/validators'

import ChangePassword from './ChangePassword.vue';

export default {
  data() {
    return {
      error: '',
      sending: false
    }
  },
  computed: {
    resetToken() {
      return this.$route.params.resetToken;
    }
  },
  methods: {
    resetPassword(password) {
      let data = {
        password: password,
        token: this.resetToken
      };

      this.sending = true;

      this.$store.dispatch('resetPassword', data)
        .then(() => {
          this.sending = false;
          this.$router.replace({
            path: '/login',
            query: { from: 'resetSuccess' }
          });
        })
        .catch((err) => {
          this.sending = false;
          this.error = 'Failed to reset password. Please try again.';
        });
    }
  },
  components: {
    'change-password': ChangePassword
  }
}
</script>