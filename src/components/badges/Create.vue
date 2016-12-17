<template>
<div class="panel panel-default">
  <div class="panel-heading">
    <h4>Create a Badge</h4>
    <span class="glyphicon glyphicon-remove close-button"
          @click="close"
          aria-label="Close"></span>
  </div>
  <div class="panel-body">
    <div class="alert alert-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <form>
      <div class="row">
        <div class="form-group col-sm-4 col-xs-6">
          <label for="badge-create-name">Name</label>
          <input type="text"
                 class="form-control"
                 id="badge-create-name"
                 placeholder="New Badge"
                 v-model="badge.name">
        </div>
        <div class="form-group col-sm-8 col-xs-6">
          <label for="badge-create-notes">Notes</label>
          <input type="text"
                 class="form-control"
                 id="badge-create-notes"
                 placeholder="Notes about this badge"
                 v-model="badge.notes">
        </div>
      </div>
      <div class="row">
        <div class="form-group col-xs-12">
          <label for="badge-create-description">Description</label>
          <textarea class="form-control"
                    id="badge-create-description"
                    rows="5"
                    placeholder="Description of this badge"
                    v-model="badge.description"></textarea>
        </div>
      </div>
      <div class="pull-right">
        <button class="btn btn-primary" 
                @click.prevent="createBadge()">Create Badge</button>
        <button class="btn btn-default" 
                @click.prevent="clearAndClose()">Cancel</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
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
  }
}
</script>

<style scoped lang="sass">
.panel-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>