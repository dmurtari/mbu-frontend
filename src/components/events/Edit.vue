<template>
  <div>
  <div class="alert alert-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <form>
      <div class="form-group col-sm-6 col-xs-6">
        <label for="eventDateInput">Date</label>
        <masked-input mask="99/99/9999"
                      v-model="eventUpdate.date">
      </div>
      <div class="form-group col-sm-6 col-xs-6">
        <label for="eventPriceInput">Registration Fee</label>
        <div class="input-group">
          <div class="input-group-addon">$</div>
          <masked-input mask="99.99"
                        v-model="eventUpdate.price">
        </div>
      </div>
      <div class="form-group col-sm-6 col-xs-6">
        <label for="eventOpenInput">Registration Opens</label>
        <masked-input mask="99/99/9999"
                      v-model="eventUpdate.registration_open">
      </div>
      <div class="form-group col-sm-6 col-xs-6">
        <label for="eventCloseInput">Registration Closes</label>
        <masked-input mask="99/99/9999"
                      v-model="eventUpdate.registration_close">
      </div>
      <div class="container"
           v-if="!showDeleteConfirmation">
        <div class="pull-left">
          <button class="btn btn-danger"
                  @click="showDeleteConfirm()">Delete Event</button>
        </div>
        <div class="pull-right">
          <button class="btn btn-default" 
                  @click="close()">Cancel</button>
          <button class="btn btn-primary" 
                  @click="updateEvent()">Update Event</button>
        </div>
      </div>   
      <confirm-delete v-if="showDeleteConfirmation"
                      :match-text="this.semesterAndYear"
                      :event-id="this.event.id"
                      @close="hideDeleteConfirm()"></confirm-delete>
    </form>
  </div>
</template>

<script>
import moment from 'moment'

import ConfirmDelete from './ConfirmDelete.vue';

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
      showDeleteConfirmation: false
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
      let event = {
        id: this.event.id,
        date: this.eventUpdate.date,
        registration_open: this.eventUpdate.registration_open,
        registration_close: this.eventUpdate.registration_close,
        price: this.eventUpdate.price
      }

      this.$store.dispatch('updateEvent', event)
        .then(() => {
          this.$store.dispatch('getEvents');
        })
        .then(() => {
          this.close();
        })
        .catch((err) => {
          this.error = err;
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
  components: {
    'confirm-delete': ConfirmDelete
  },
  mounted() {
    this.eventUpdate.date = moment(this.event.date).format(dateFormat);
    this.eventUpdate.registration_open = 
      moment(this.event.registration_open).format(dateFormat);
    this.eventUpdate.registration_close = 
      moment(this.event.registration_close).format(dateFormat);
    this.eventUpdate.price = this.event.price;
  }
}
</script>