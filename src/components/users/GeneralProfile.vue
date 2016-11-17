<template>
<div>
  <dl class="dl-horizontal">
    <dd><h4>{{ fullname }}</h4></dd>
    <dt>Email:</dt>
    <dd>{{ profile.email }}</dd>
    <dt>Your role:</dt>
    <dd>{{ role }}</dd>
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
    },
    role() {
      return _.capitalize(this.profile.role);
    }
  }
}
</script>