<template>
<form class="form-horizontal">
  <span class="help-block">
    Enter the new password you would like to use to login to your account.
  </span>
  <div class="form-group">
    <label class="control-label col-sm-3">
      New password
    </label>
    <div class="col-sm-9">
      <input type="password"
            class="form-control"
            v-model="password">
    </div>
  </div>
  <div class="form-group">
    <label class="control-label col-sm-3">
      Confirm your password
    </label>
    <div class="col-sm-9">
      <input type="password"
            class="form-control"
            v-model="passwordConfirmation">
    </div>
  </div>
  <button class="btn btn-primary pull-right"
          :class="{ 'disabled': clicked }"
          @click="resetPassword()">
          Set Password
  </button>
</form>
</template>