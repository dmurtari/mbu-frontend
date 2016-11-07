<template>
<div class="container col-md-6 col-md-offset-3">
  <h3>Reset your password</h3>
  <div class="form-group">
    <label class="control-label">
      Enter the email you used to create your account
    </label>
    <input type="text"
          class="form-control"
          v-model="email">
    <span class="help-block">
      A link to reset your password will be emailed to you from
      no&#8209;reply@apo&#8209;gammatheta.org. Please check your spam folder 
      if you do not see this email. 
    </span>
  </div>
</div>
</template>

<script>
export default {
  deta() {
    return {
      email: ''
    }
  }
}
</script>