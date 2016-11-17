<template>
<div>
  <h3>Your Profile</h3>
  <general-profile :profile="profile"></general-profile>
  <coordinator-detail v-if="profile.role === 'coordinator' "
                      :details="profile.details"></coordinator-detail>
</div>
</template>

<script>
import { mapGetters } from 'vuex';

import GeneralProfile from './GeneralProfile.vue';
import CoordinatorDetail from './CoordinatorDetail.vue';

export default {
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  components: {
    'coordinator-detail': CoordinatorDetail,
    'general-profile': GeneralProfile
  }
}
</script>