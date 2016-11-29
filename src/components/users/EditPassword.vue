<template>
<div class="col-lg-offset-2 col-lg-8">
  <form class="form-horizontal" v-if="!reset">
    <div class="alert alert-danger" v-if="error">
      {{ error }}
    </div>
    <span class="help-block text-center">
      Enter the new password you would like to use to login to your account.
    </span>
    <div class="form-group">
      <label class="control-label col-sm-5">
        New Password
      </label>
      <div class="col-sm-7">
        <input type="password"
              class="form-control"
              v-model="password">
      </div>
    </div>
    <div class="form-group">
      <label class="control-label col-sm-5">
        Confirm Change
      </label>
      <div class="col-sm-7">
        <input type="password"
              class="form-control"
              v-model="passwordConfirmation">
      </div>
    </div>
    <button class="btn btn-primary pull-right"
            @click.prevent="submit()">
            Set Password
    </button>
  </form>
</div>
</template>

<script>
export default {
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      password: '',
      passwordConfirmation: ''
    }
  },
  methods: {
    submit() {
      console.log('Changing password');
    }
  }
}
</script>