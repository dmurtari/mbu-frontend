<template>
  <div class="container-fluid">
      <div class="row">
        <strong>Added On:</strong> {{ scout.created_at | shortDate }}
      </div>
      <div class="row">
        <strong>Birthday:</strong> {{ scout.birthday | shortDate }}
      </div>
      <div class="row">
        <strong>Age:</strong> {{ scout.age }}
      </div>
      <div class="row">
        <strong>Troop:</strong> {{ scout.troop }}
      </div>
    <div class="row" v-if="scout.notes">
      <strong>Notes:</strong> {{ scout.notes }}
    </div>
    <br><br>
    <div class="row">
      <h5>Emergency Contact Information (Please keep this information up to date):</h5>
    </div>
    <div class="row">
      <strong>Name:</strong> {{ scout.emergency_name }}
    </div>
    <div class="row">
      <strong>Relationship to Scout:</strong> {{ scout.emergency_relation }}
    </div>
    <div class="row">
      <strong>Contact Number:</strong> {{ scout.emergency_phone }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    scout: {
      type: Object,
      required: true
    }
  }
}
</script>