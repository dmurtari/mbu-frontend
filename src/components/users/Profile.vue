<template>
<div>
  <h3>Your Profile</h3>
  <coordinator-detail v-if="profile.role === 'coordinator' "
                      :profile="profile"></coordinator-detail>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

import CoordinatorDetail from './CoordinatorDetail.vue';

export default {
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  components: {
    'coordinator-detail': CoordinatorDetail
  }
}
</script>