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
  </div>
</template>

<script>
import Create from './Create.vue';
import { mapGetters } from 'vuex';

export default { 
  data() {
    return {
      displayAddScout: false
    };
  },
  computed: {
    ...mapGetters([
      'profile'
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
    'create-scout': Create
  }
}
</script>