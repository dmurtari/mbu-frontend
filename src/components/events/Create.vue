<template>
<div class="panel panel-default">
  <div class="panel-heading">
    <h4>Create an Event</h4>
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
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventYearInput">Year</label>
        <masked-input mask="9999" 
                      placeholder="yyyy"
                      v-model="event.year"></masked-input>
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
        <label for="eventPriceInput">Registration Fee</label>
        <div class="input-group">
          <div class="input-group-addon">$</div>
          <masked-input mask="99.99"
                        placeholder="00.00"
                        v-model="event.price">
        </div>
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventDateInput">Date</label>
        <masked-input mask="99/99/9999"
                      placeholder="mm/dd/yyyy"
                      v-model="event.date">
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventOpenInput">Registration Opens</label>
        <masked-input mask="99/99/9999"
                      placeholder="mm/dd/yyyy"
                      v-model="event.registration_open">
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventCloseInput">Registration Closes</label>
        <masked-input mask="99/99/9999"
                      placeholder="mm/dd/yyyy"
                      v-model="event.registration_close">
      </div>
      <div class="container">
        <div class="pull-right">
          <button class="btn btn-default" 
                  @click="clearAndClose()">Cancel</button>
          <button class="btn btn-primary" 
                  @click="createEvent()">Create Event</button>
        </div>
      </div>
    </form>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

import _ from 'lodash';
import moment from 'moment';

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
  methods: {
    createEvent() {
      const dateFormat = 'MM/DD/YYYY'
      let event = {
        year: Number(this.event.year),
        semester: this.event.semester,
        date: moment(this.event.date, dateFormat),
        registration_open: moment(this.event.registration_open, dateFormat),
        registration_close: moment(this.event.registration_close, dateFormat),
        price: Number(this.event.price)
      }

      this.$store.dispatch('addEvent', event)
        .then(() => {
          this.$store.dispatch('getEvents');
        })
        .then((data) => {
          this.clearAndClose();
        })
        .catch((err) => {
          this.error = err;
        })
    },
    clearAndClose() {
      _.forEach(this.event, (value, key) => {
        this.event[key] = '';
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