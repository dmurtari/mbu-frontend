<template>
  <div class="box">
    <h4 class="title is-4">Create an Event</h4>
    <p>
      Fill out the information below to create a new Merit Badge University
      event. To add merit badges that will be offered at this event, go to
      <router-link to="/administration"> the administration page</router-link>.
    </p>
    <br>
    <div class="notification is-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <form>
      <div class="columns is-multiline">
        <div class="control column is-4">
          <label class="label" for="event-create-year">Year</label>
          <masked-input mask="9999" 
                        placeholder="yyyy"
                        id="event-create-year"
                        :class="{ 'is-danger': $v.event.year.$error }"
                        @blur="$v.event.year.$touch"
                        v-model="event.year"></masked-input>
          <span class="help is-danger" v-if="$v.event.year.$error">
            Please enter a valid year
          </span>
        </div>
        <div class="control column is-4">
          <label class="label" for="event-create-semester">Semester</label>
          <span class="select">
            <select id="event-create-semester" 
                    class="input"
                    :class="{ 'is-danger': $v.event.semester.$error }"
                    @blur="$v.event.semester.$touch"
                    v-model="event.semester">
              <option v-for="semester in semesters" v-bind:value="semester.value">
                {{ semester.text }}
              </option>
            </select>
          </span>
          <span class="help is-danger" v-if="$v.event.semester.$error">
            Please pick a semester for this event
          </span>
        </div>
        <div class="control column is-4">
          <label class="label" for="event-create-price">Registration Fee</label>
          <masked-input mask="99.99"
                        placeholder="00.00"
                        :class="{ 'is-danger': $v.event.price.$error }"
                        @blur="$v.event.price.$touch"
                        id="event-create-price"
                        v-model="event.price"></masked-input>
          <span class="help is-danger" v-if="$v.event.price.$error">
            Please enter the price of the event (or 00.00)
          </span>
        </div>
        <div class="control column is-4">
          <label class="label" for="event-create-date">Date</label>
          <masked-input mask="99/99/9999"
                        placeholder="mm/dd/yyyy"
                        id="event-create-date"
                        :class="{ 'is-danger': $v.event.date.$error }"
                        @blur="$v.event.date.$touch"
                        v-model="event.date"></masked-input>
          <span class="help is-danger" v-if="$v.event.date.$error">
            Please enter a valid date for this event
          </span>
        </div>
        <div class="control column is-4">
          <label class="label" for="event-create-open">Registration Opens</label>
          <masked-input mask="99/99/9999"
                        placeholder="mm/dd/yyyy"
                        id="event-create-open"
                        :class="{ 'is-danger': $v.event.registration_open.$error }"
                        @blur="$v.event.registration_open.$touch"
                        v-model="event.registration_open"></masked-input>
        </div>
        <div class="control column is-4">
          <label class="label" for="event-create-close">Registration Closes</label>
          <masked-input mask="99/99/9999"
                        placeholder="mm/dd/yyyy"
                        id="event-create-close"
                        :class="{ 'is-danger': $v.event.registration_close.$error }"
                        @blur="$v.event.registration_close.$touch"
                        v-model="event.registration_close"></masked-input>
        </div>
        <div class="control column is-12">
          <label class="checkbox">
            <input v-model="current" type="checkbox"> Mark this as the current event
          </label>
        </div>
      </div>
      <button class="button is-primary" 
              @click.prevent="createEvent()">Create Event</button>
      <button class="button" 
              @click.prevent="clearAndClose()">Cancel</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import { date, beforeDate, betweenDate } from 'validators';

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
      error: '',
      current: false
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
        .then((event) => {
          if (this.current) {
            return this.$store.dispatch('saveCurrentEvent', event.id);
          }

          return;
        })
        .then(() => {
          return this.$store.dispatch('getEvents');
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
  },
  validations: {
    event: {
      year: { required, date: date('YYYY') },
      semester: { required },
      date: { required, date: date('MM/DD/YYYY') },
      registration_open: {
        required,
        date,
        beforeDate: beforeDate(this.event.date)
      },
      registration_close: {
        required,
        date,
        betweenDate: betweenDate('event.registration_open', 'event.date')
      },
      price: { required }
    }
  }
}
</script>

<style scoped lang="sass">
  span.select {
    width: 100%;

    select {
      width: 100%;
    }
  }
</style>