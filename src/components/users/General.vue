<template>
<div>
  <h4>Account Information</h4>
  <dl class="dl-horizontal">
    <dt>Name:</dt><dd>{{ fullname }}</dd>
    <dt>Email:</dt><dd>{{ profile.email }}</dd>
    <dt>Your Role:</dt><dd>{{ profile.role | capitalize }}</dd>
    <div v-for="(value, key) in profile.details">
      <dt>{{ key | capitalize}}:</dt><dd>{{ value | capitalize}}</dd>
    </div>
  </dl>
</div>
</template>

<script>
import _ from 'lodash';

export default {
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  computed: {
    fullname() {
      return this.profile.firstname + ' ' + this.profile.lastname;
    }
  }
}
</script>