<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <h5>Add a Scout to Your Troop</h5>
      <span class="glyphicon glyphicon-remove close-button"
          @click="close"
          aria-label="Close"></span>
    </div>
    <div class="panel-body">
      <form>
        <div class="row">
          <div class="form-group col-sm-3">
            <label for="scout-create-first-name">First Name</label>
            <input type="text"
                   class="form-control"
                   id="scout-create-first-name"
                   placeholder="First Name"
                   v-model="scout.firstname">
          </div>
          <div class="form-group col-sm-3">
            <label for="scout-create-last-name">Last Name</label>
            <input type="text"
                   class="form-control"
                   id="scout-create-last-name"
                   placeholder="Last Name"
                   v-model="scout.lastname">
          </div>
          <div class="form-group col-sm-3">
            <label for="scout-create-birthday">Birthday</label>
            <masked-input mask="99/99/9999"
                          placeholder="mm/dd/yyyy"
                          id="scout-create-birthday"
                          v-model="scout.birthday">
          </div>
          <div class="form-group col-sm-3">
            <label for="scout-create-troop">Troop</label>
            <input type="number"
                   class="form-control"
                   id="scout-create-troop"
                   placeholder="Troop"
                   v-model="scout.troop">
          </div>
          <div class="form-group col-sm-12">
            <label for="scout-create-notes">Anything else we should know?</label>
            <textarea class="form-control"
                      id="scout-create-notes"
                      rows="2"
                      placeholder="Allergies, dietery needs, etc."
                      v-model="scout.notes"></textarea>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      scout: {
        firstname: '',
        lastname: '',
        birthday: '',
        troop: '',
        notes: '',
        emergency_name: '',
        emergency_phone: '',
        emergency_relation: ''
      }
    };
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