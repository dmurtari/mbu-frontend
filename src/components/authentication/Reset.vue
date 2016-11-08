<template>
<div class="container col-md-6 col-md-offset-3">
  <h3>Reset your password</h3>
  <email-form v-if="!resetToken"></email-form>
  <reset-form v-if="resetToken"
              :resetToken="resetToken"></reset-form>
</div>
</template>

<script>
import EmailForm from './EmailForm.vue';
import ResetForm from './ResetForm.vue';

export default {
  computed: {
    resetToken() {
      return this.$route.params.resetToken;
    }
  },
  components: {
    'email-form': EmailForm,
    'reset-form': ResetForm
  }
}
</script>