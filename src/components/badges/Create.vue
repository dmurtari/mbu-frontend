<template>
  <div class="box">
    <h4 class="title is-4">Create a Badge</h4>
    <h6 class="title is-6">
      Fill out the information below to add a new merit badge. Note that this
      will not be associated with any events 
      (go to <router-link to="/offerings"> the offerings page</router-link>
      to manage merit badge offerings).
    </h6>
    <div class="notification is-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <form>
      <div class="columns">
        <div class="control column is-4">
          <label class="label" for="badge-create-name">Name</label>
          <input type="text"
                 class="input"
                 id="badge-create-name"
                 placeholder="New Badge"
                 @blur="$v.badge.name.$touch"
                 :class="{ 'is-danger': $v.badge.name.$error }"
                 v-model="badge.name">
          <span class="help is-danger" v-if="$v.badge.name.$error">
            The name of the merit badge is required
          </span>
        </div>
        <div class="control column is-8">
          <label class="label" for="badge-create-notes">Notes</label>
          <input type="text"
                 class="input"
                 id="badge-create-notes"
                 placeholder="Notes about this badge"
                 v-model="badge.notes">
        </div>
      </div>
      <div class="control">
        <label class="label" for="badge-create-description">Description</label>
        <textarea class="textarea"
                  id="badge-create-description"
                  rows="5"
                  placeholder="Description of this badge"
                  v-model="badge.description"></textarea>
      </div>
      <div>
        <button class="button is-primary" 
                :disabled="$v.$invalid"
                @click.prevent="createBadge()">Create Badge</button>
        <button class="button" 
                @click.prevent="clearAndClose()">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      error: '',
      badge: {
        name: '',
        description: '',
        notes: ''
      }
    };
  },
  methods: {
    createBadge() {
      let badge = {
        name: this.badge.name,
        description: this.badge.description,
        notes: this.badge.notes
      };

      this.$store.dispatch('addBadge', badge)
        .then(()=> {
          return this.$store.dispatch('getBadges')
        })
        .then(() => {
          this.clearAndClose();
        })
        .catch((err) => {
          this.error = 'Error creating badge, please try again. Name is required.';
        });
    },
    clearAndClose() {
      _.forEach(this.badge, (value, key) => {
        this.badge[key] = '';
      });

      this.error = '';
      this.close();
    },
    close() {
      this.$emit('close');
    }
  },
  validations: {
    badge: {
      name: { required }
    }
  }
}
</script>