<template>
  <div>
    <h4 class="title is-4">
      Manage Administrative Users
    </h4>
    <div class="content">
      <p>
        Manage users that have administrative access to this website. Administrative have
        complete access to this website to create, edit, and delete anything. Administrative
        users cannot use their account to register scouts for events.
      </p>
      <p>
        <strong>
          Currently, you must create a new account for administrators manually, and
          the email address used can not be used with any other account.
        </strong>
      </p>
    </div>
    <button class="button is-primary"
            @click="toggleCreate()"
            v-if="!createAdmin">Create a new Admin</button>
    <create-admin-form v-if="createAdmin"
                       @close="toggleCreate()"></create-admin-form>
    <general-list class="admins"
                  :users="admins"></general-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import GeneralList from 'components/administration/users/GeneralList.vue';
import CreateAdminForm from './CreateAdminForm.vue';

export default {
  data () {
    return {
      createAdmin: false
    }
  },
  computed: {
    ...mapGetters([
      'admins'
    ])
  },
  methods: {
    toggleCreate () {
      this.createAdmin = !this.createAdmin;
    }
  },
  components: {
    CreateAdminForm,
    GeneralList
  }
}
</script>

<style lang="scss" scoped>
.admins {
  margin-top: 2rem;
}
</style>
