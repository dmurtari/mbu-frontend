<template>
<form>
  <div class="row">
    <div class="form-group col-sm-4 col-xs-6">
      <label for="badge-edit-name">Name</label>
      <input type="text"
              class="form-control"
              id="badge-edit-name"
              placeholder="New Badge"
              v-model="badgeUpdate.name">
    </div>
    <div class="form-group col-sm-8 col-xs-6">
      <label for="badge-edit-notes">Notes</label>
      <input type="text"
              class="form-control"
              id="badge-edit-notes"
              placeholder="Notes about this badge"
              v-model="badgeUpdate.notes">
    </div>
  </div>
  <div class="row">
    <div class="form-group col-xs-12">
      <label for="badge-edit-description">Description</label>
      <textarea class="form-control"
                id="badge-edit-description"
                rows="5"
                placeholder="Description of this badge"
                v-model="badgeUpdate.description"></textarea>
    </div>
  </div>
  <div class="pull-right">
    <button class="btn btn-primary" 
            @click.prevent="updateBadge()">Save Changes</button>
    <button class="btn btn-default" 
            @click.prevent="close()">Cancel</button>
  </div>
</form>
</template>

<script>
export default {
  props: {
    badge: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      error: '',
      badgeUpdate: {
        name: '',
        description: '',
        notes: ''
      }
    };
  },
  methods: {
    updateBadge() {
      let badge = {
        name: this.badgeUpdate.name,
        description: this.badgeUpdate.description,
        notes: this.badgeUpdate.notes
      };

      badge.id = this.badge.id;

      this.$store.dispatch('updateBadge', badge)
        .then(()=> {
          this.$store.dispatch('getBadges')
        })
        .then(() => {
          this.close();
        })
        .catch((err) => {
          this.error = 'Error updating badge, please try again. Name is required.';
        });
    },
    close() {
      this.$emit('close');
    }
  },
  mounted() {
    this.badgeUpdate.name = this.badge.name;
    this.badgeUpdate.description = this.badge.description;
    this.badgeUpdate.notes = this.badge.notes;
  }
}
</script>