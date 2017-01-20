<template>
  <div>
      <p>
        <strong>Added On:</strong> {{ scout.created_at | shortDate }}
      </p>
      <p>
        <strong>Birthday:</strong> {{ scout.birthday | shortDate }}
      </p>
      <p>
        <strong>Age:</strong> {{ scout.age }}
      </p>
      <p>
        <strong>Troop:</strong> {{ scout.troop }}
      </p>
    <p v-if="scout.notes">
      <strong>Notes:</strong> {{ scout.notes }}
    </p>
    <br>
    <p>
      <h6 class="title is-6">
        <b>Emergency Contact:</b>
      </h6>
    </p>
    <p>
      <strong>Name:</strong> {{ scout.emergency_name }}
    </p>
    <p>
      <strong>Relationship to Scout:</strong> {{ scout.emergency_relation }}
    </p>
    <p>
      <strong>Contact Number:</strong> {{ scout.emergency_phone }}
    </p>
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