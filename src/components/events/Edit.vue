<template>
  <div>
    <div class="alert alert-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <form  v-if="!showDeleteConfirmation">
      <div class="columns is-multiline">
        <div class="control column is-6">
          <label class="label" for="event-edit-price">Registration Fee</label>
          <masked-input mask="99.99"
                        placeholder="00.00"
                        id="event-edit-price"
                        :class="{ 'is-danger': $v.eventUpdate.price.$error }"
                        @blur="$v.eventUpdate.price.$touch"
                        v-model="eventUpdate.price"></masked-input>
          <span class="help is-danger" v-if="$v.eventUpdate.price.$error">
            Please enter the price of the event (or 00.00)
          </span>
        </div>
        <div class="control column is-6">
          <label class="label" for="event-edit-date">Date</label>
          <masked-input mask="99/99/9999"
                        placeholder="mm/dd/yyyy"
                        id="event-edit-date"
                        :class="{ 'is-danger': $v.eventUpdate.date.$error }"
                        @blur="$v.eventUpdate.date.$touch"
                        v-model="eventUpdate.date"></masked-input>
          <span class="help is-danger" v-if="$v.eventUpdate.date.$error">
            Please enter a valid date for this event
          </span>
        </div>
        <div class="control column is-6">
          <label class="label" for="event-edit-open">Registration Opens</label>
          <masked-input mask="99/99/9999"
                        placeholder="mm/dd/yyyy"
                        id="event-edit-open"
                        :class="{ 'is-danger': $v.eventUpdate.registration_open.$error }"
                        @blur="$v.eventUpdate.registration_open.$touch"
                        v-model="eventUpdate.registration_open"></masked-input>
          <span class="help is-danger" v-if="$v.eventUpdate.registration_open.$error">
            Please enter a valid date for registration opening, before the day
            of the event
          </span>
        </div>
        <div class="control column is-6">
          <label class="label" for="event-edit-close">Registration Closes</label>
          <masked-input mask="99/99/9999"
                        placeholder="mm/dd/yyyy"
                        id="event-create-close"
                        :class="{ 'is-danger': $v.eventUpdate.registration_close.$error }"
                        @blur="$v.eventUpdate.registration_close.$touch"
                        v-model="eventUpdate.registration_close"></masked-input>
          <span class="help is-danger" v-if="$v.eventUpdate.registration_close.$error">
            Please enter a valid date for registration closing, between 
            registration opening and the event day
          </span>
        </div>
      </div>
      <div>
        <button class="button is-primary"
                :disabled="$v.$invalid"
                :class="{ 'is-disabled is-loading': saving }"
                @click.prevent="updateEvent()">Update Event</button>
        <button class="button is-default" 
                @click.prevent="close()">Cancel</button>
        <button class="button is-link"
                :class="{ 'is-disabled is-loading': settingCurrent }"
                @click.prevent="setAsCurrent()">Set as the Current Event</button>
        <button class="button is-danger is-pulled-right"
                @click.prevent="showDeleteConfirm()">Delete Event</button>
      </div>   
    </form>
    <confirm-delete v-if="showDeleteConfirmation"
                    class="container-fluid"
                    :match-text="this.semesterAndYear"
                    :placeholder="'Summer 2008'"
                    @deleteSuccess="deleteEvent()"
                    @close="hideDeleteConfirm()">
      <span slot="header">
        Do you really want to delete this event? This cannot be undone, and will
        likely break existing registration records!
      </span>
      <span slot="help-text">
        Enter the semester and year to confirm deletion. <b>This action cannot
        be undone, and will also remove all data associated with this event, 
        including registrations and completion records.</b>
      </span>
    </confirm-delete>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { date, beforeDate, betweenDate } from 'validators';

import moment from 'moment'

const dateFormat = 'MM/DD/YYYY'

export default {
  data() {
    return {
      eventUpdate: {
        date: '',
        registration_open: '',
        registration_close: '',
        price: ''
      },
      error: '',
      showDeleteConfirmation: false,
      saving: false,
      settingCurrent: false
    }
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  computed: {
    semesterAndYear() {
      return this.event.semester + ' ' + this.event.year;
    }
  },
  methods: {
    updateEvent() {
      this.saving = true;

      let event = {
        id: this.event.id,
        date: moment(this.eventUpdate.date, dateFormat),
        registration_open: moment(this.eventUpdate.registration_open, dateFormat),
        registration_close: moment(this.eventUpdate.registration_close, dateFormat),
        price: this.eventUpdate.price
      }

      this.$store.dispatch('updateEvent', event)
        .then(() => {
          return this.$store.dispatch('getEvents');
        })
        .then(() => {
          this.saving = false;
          this.close();
        })
        .catch((err) => {
          this.saving = false;
          this.error = err;
        });
    },
    deleteEvent() {
      this.$store.dispatch('deleteEvent', this.event.id)
        .then(() => {
          this.$store.dispatch('getEvents');
          this.$emit('close');
        })
        .catch(() => {
          this.error = 'There was a problem deleting this event.';
        });
    },
    setAsCurrent() {
      this.settingCurrent = true;
      this.$store.dispatch('saveCurrentEvent', this.event.id)
        .then(() => {
          return this.$store.dispatch('getEvents');
        }).then(() => {
          this.settingCurrent = false;
          this.$emit('close');
        })
        .catch(() => {
          this.settingCurrent = false;
          this.error = 'Failed to set this event as current.';
        });
    },
    showDeleteConfirm() {
      this.showDeleteConfirmation = true;
    },
    hideDeleteConfirm() {
      this.showDeleteConfirmation = false;
    },
    close() {
      this.$emit('close');
    }
  },
  mounted() {
    this.eventUpdate.date = moment(this.event.date).format(dateFormat);
    this.eventUpdate.registration_open = 
      moment(this.event.registration_open).format(dateFormat);
    this.eventUpdate.registration_close = 
      moment(this.event.registration_close).format(dateFormat);
    this.eventUpdate.price = this.event.price;
  },
  validations: {
    eventUpdate: {
      date: { required, date: date('MM/DD/YYYY') },
      registration_open: {
        required,
        date,
        beforeDate: beforeDate('date')
      },
      registration_close: {
        required,
        date,
        betweenDate: betweenDate('registration_open', 'date')
      },
      price: { required }
    }
  }
}
</script>