<template>
<div class="panel panel-default">
  <div class="panel-heading">
    <h4>Create an Event</h4>
    <span class="glyphicon glyphicon-remove close-button"
          @click="cancel"
          aria-label="Close"></span>
  </div>
  <div class="panel-body">
    <div class="alert alert-danger" v-if="error">
      <p>{{ error }}</p>
    </div>
    <form>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventYearInput">Year</label>
        <select class="form-control" v-model="event.year">
          <option v-for="year in years" v-bind:value="year">
            {{year}}
          </option>
        </select>
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventSemesterInput">Semester</label>
        <select class="form-control" v-model="event.semester">
          <option v-for="semester in semesters" v-bind:value="semester.value">
            {{ semester.text }}
          </option>
        </select>
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventPriceInput">Registration Cost</label>
        <div class="input-group">
          <div class="input-group-addon">$</div>
          <input type="number"
                 class="form-control"
                 id="eventPriceInput"
                 v-model="event.price">
        </div>
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventDateInput">Date</label>
        <input type="date"
               class="form-control"
               id="eventDateInput"
               placeholder="mm/dd/yyyy"
               v-model="event.date">
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventOpenInput">Registration Opens</label>
        <input type="date"
               class="form-control"
               id="eventOpenInput"
               placeholder="mm/dd/yyyy"
               v-model="event.registration_open">
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventCloseInput">Registration Closes</label>
        <input type="date"
               class="form-control"
               id="eventCloseInput"
               placeholder="mm/dd/yyyy"
               v-model="event.registration_close">
      </div>
      <div class="row text-center">
        <button class="btn btn-primary" 
                @click="createEvent()">Create Event</button>
        <button class="btn btn-default" 
                @click="clearAndCancel()">Cancel</button>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import requests from '../../services/events/requests';
import _ from 'lodash';

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
  },
  computed: {
    years() {
      let start = new Date().getFullYear();
      var years = [];

      for (var year = start + 5; year > start - 5; year--) {
        years.push(year);
      }

      return years;
    }
  },
  methods: {
    createEvent() {
      requests.createEvent(this, this.event)
        .then(() => {

        });
    },
    clearAndCancel() {
      _.forEach(this.event, (value, key) => {
        this.event[key] = '';
      });
      this.$emit('cancel');
    },
    cancel() {
      this.$emit('cancel');
    }
  },
  mounted: function() {
    $('#eventDateInput').datepicker();
    $('#eventOpenInput').datepicker();
    $('#eventCloseInput').datepicker();
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