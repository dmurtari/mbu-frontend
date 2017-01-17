<template>
  <div class="section column is-8 is-offset-2">
    <h4 class="title is-4">Change Your Password</h4>
    <change-password :sending="sending"
                     :error="error"
                     :showCancel="true"
                     @cancel="close()"
                     @resetPassword="resetPassword($event)"></change-password>
  </div>
</template>

<script>
import ChangePassword from '../../authentication/ChangePassword.vue';

export default {
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      error: '',
      sending: false
    }
  },
  methods: {
    close() {
      this.$emit('toggle');
    },
    resetPassword(password) {
      let data = {
        id: this.id,
        password: password
      }

      this.sending = true;
      this.$store.dispatch('updateProfile', data)
        .then(() => {
          this.sending = false;
          this.error = '';
          this.$emit('toggle');
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