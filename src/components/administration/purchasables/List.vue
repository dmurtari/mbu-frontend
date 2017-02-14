<template>
  <div>
    <h4 class="title is-4">
      Manage Purchasable Items
    </h4>
    <p>
      Use this page to manage items that scouts can purchase for events (for
      example: lunches, t-shirts, or patches). You can give each item a name,
      description, as well as restrict the age range of scouts can purchase an
      item. Scouts will be able to specify which and how many of each item they
      would like to purchase when they register.
    </p>
    <div class="notification is-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <div class="box purchasable-list-filters">
      <div class="columns">
        <div class="column is-6">
          <div class="control is-horizontal">
            <div class="control-label">
              <label class="label">For&nbsp;Event:</label>
            </div>
            <div class="control">
              <events-dropdown @select="pickEvent($event)"></events-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
    <button class="button is-primary"
            v-if="!showCreate"
            @close="toggleCreate()"
            @click="toggleCreate()">Add a New Item</button>
    <create-purchasable v-if="showCreate"></create-purchasable>
    <loader v-if="loading" :color="'lightgray'" class="purchasables-loading"></loader>
  </div>
</template>

<script>
import Create from './Create.vue';
import EventsDropdown from '../../shared/EventsDropdown.vue';

export default {
  data() {
    return {
      error: '',
      eventId: '',
      loading: false,
      showCreate: false
    };
  },
  methods: {
    pickEvent(eventId) {
      this.eventId = eventId;
    },
    toggleCreate() {
      this.showCreate = !this.showCreate;
    }
  },
  components: {
    'create-purchasable': Create,
    'events-dropdown': EventsDropdown
  }
}
</script>

<style lang="sass" scoped>
  .purchasable-list-filters {
    margin-top: 2em;
  }

  .purchasables-loading {
    margin-top: 5em;
    width: 5em;
    display: block;
    margin: auto;
  }
</style>