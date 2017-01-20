<template>
  <div class="container-fluid">
    <h3>Your Troop</h3>
    <p>
      This is an overview of the scouts that you have added to your troop. You 
      can add new scouts, edit scout information, and remove scouts from your 
      troop.
    </p>
    <button class="btn btn-default"
            v-if="!displayAddScout"
            @click="toggleAdd()"
            data-toggle="tooltip"
            data-placement="right">
      Add a new scout
    </button>
    <create-scout v-if="displayAddScout"
                  @close="toggleAdd()"></create-scout>
    <div class="scout-list row">
      <div v-for="scout in scouts" class="col-sm-6 col-md-4">
        <scout :scout="scout"></scout>
      </div>
    </div>
  </div>
</template>

<script>
import Create from './Create.vue';
import { mapGetters } from 'vuex';

import Scout from './Scout.vue';

export default { 
  data() {
    return {
      displayAddScout: false
    };
  },
  computed: {
    ...mapGetters([
      'profile',
      'scouts'
    ])
  },
  methods: {
    toggleAdd() {
      this.displayAddScout = !this.displayAddScout;
    }
  },
  watch: {
    profile() {
      this.$store.dispatch('getScouts', this.profile.id);
    }
  },
  components: {
    'create-scout': Create,
    'scout': Scout
  }
}
</script>

<style lang="sass">
.scout-list {
  margin-top: 2em;
}
</style>