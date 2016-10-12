<template>
<div class="panel panel-default">
  <div class="panel-heading"><h4>Create an Event</h4></div>
  <div class="panel-body">
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <form>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventYearInput">Year</label>
        <input type="text"
              class="form-control"
              id="eventYearInput"
              v-model="event.year">
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventSemesterInput">Semester</label>
        <select class="form-control" v-model="event.semester">
          <option v-for="option in semesters" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventPriceInput">Registration Cost</label>
        <input type="number"
              class="form-control"
              id="eventPriceInput"
              v-model="event.price">
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventDateInput">Date</label>
        <input type="date"
              class="form-control"
              id="eventDateInput"
              v-model="event.date">
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventOpenInput">Registration Opens</label>
        <input type="date"
              class="form-control"
              id="eventOpenInput"
              v-model="event.registration_open">
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventCloseInput">Registration Closes</label>
        <input type="date"
              class="form-control"
              id="eventCloseInput"
              v-model="event.registration_close">
      </div>
      <button class="btn btn-primary" @click="submit()">Create Event</button>
    </form>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      event: {
        year: '',
        semester: '',
        date: '',
        registration_open: '',
        registration_close: '',
        price: ''
      },
      semesters: [
        { text: 'Spring', value: 'Spring' },
        { text: 'Fall', value: 'Fall' }
      ],
      error: ''
    }
  }
}
</script>