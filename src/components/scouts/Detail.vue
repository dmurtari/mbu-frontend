<template>
  <div>
    <div class="row">
      <div class="col-lg-12">
        <strong>Added On:</strong> {{ scout.created_at | longDate }}
      </div>
      <div class="col-lg-12">
        <strong>Birthday:</strong> {{ scout.birthday | longDate }}
      </div>
      <div class="col-lg-12">
        <strong>Age:</strong> {{ scout.age }}
      </div>
      <div class="col-lg-12">
        <strong>Troop:</strong> {{ scout.troop }}
      </div>
    </div>
    <div class="row col-lg-12" v-if="scout.notes">
      <strong>Notes:</strong> {{ scout.notes }}
    </div>
    <br><br>
    <div class="row col-lg-12">
      <h5>Emergency Contact Information (Please keep this information up to date):</h5>
    </div>
    <div class="row">
      <div class="col-lg-4">
        <strong>Name:</strong> {{ scout.emergency_name }}
      </div>
      <div class="col-lg-4">
        <strong>Relationship to Scout:</strong> {{ scout.emergency_relation }}
      </div>
      <div class="col-lg-4">
        <strong>Contact Number:</strong> {{ scout.emergency_phone }}
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: {
    scout: {
      type: Object,
      required: true
    }
  }
}
</script>