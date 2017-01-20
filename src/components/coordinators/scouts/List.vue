<template>
  <div>
    <h3 class="title is-4">Your Troop</h3>
    <p>
      This is an overview of the scouts that you have added to your troop. You 
      can add new scouts, edit scout information, and remove scouts from your 
      troop.
    </p>
    <br>
    <button class="button"
            v-if="!displayAddScout"
            @click="toggleAdd()">
      Add a new scout
    </button>
    <create-scout v-if="displayAddScout"
                  @close="toggleAdd()"></create-scout>
    <br>
    <div class="scout-list">
      <div class="columns is-multiline">
        <div v-for="scout in scouts" class="column is-6-tablet is-4-desktop">
          <scout :scout="scout"></scout>
        </div>
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