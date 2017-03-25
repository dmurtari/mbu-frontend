<template>
  <div>
    <h5 class="title is-5">{{ event.semester }} {{ event.year}}</h5>
    <scout-registration :event="event"
                        :preferences="registrationPreferences"
                        :purchases="registrationPurchases"
                        :assignments="registrationAssignments"></scout-registration>
  </div>
</template>

<script>
import ScoutRegistration from './ScoutRegistration.vue';
import RegistrationMappers from '../../mixins/RegistrationMappers';


export default {
  components: {
    ScoutRegistration
  },
  mixins: [
    RegistrationMappers
  ]
}
</script>