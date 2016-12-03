<template>
<div class="container col-md-6 col-md-offset-3">
  <h3>Reset your password</h3>
  <router-view></router-view>
</div>
</template>

<script>
export default {
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem('token')) {
      next((vm) => vm.$router.push('/'));
    }
    next();
  }
}
</script>