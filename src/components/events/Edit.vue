<template>
  <div>
  <div class="alert alert-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <form>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventDateInput">Date</label>
        <masked-input mask="99/99/9999"
                      placeholder="mm/dd/yyyy"
                      v-model="eventUpdate.date">
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventPriceInput">Registration Fee</label>
        <div class="input-group">
          <div class="input-group-addon">$</div>
          <input type="number"
                 class="form-control"
                 v-model="eventUpdate.price">
        </div>
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventOpenInput">Registration Opens</label>
        <masked-input mask="99/99/9999"
                      placeholder="mm/dd/yyyy"
                      v-model="eventUpdate.registration_open">
      </div>
      <div class="form-group col-sm-4 col-xs-6">
        <label for="eventCloseInput">Registration Closes</label>
        <masked-input mask="99/99/9999"
                      placeholder="mm/dd/yyyy"
                      v-model="eventUpdate.registration_close">
      </div>
      <div class="text-center submit-group">
        <button class="btn btn-primary" 
                @click="updateEvent()">Update Event</button>
      </div>
    </form>
  </div>
</template>

<script>
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
      error: ''
    }
  },
  props: {
    event: {
      type: Object,
      required: true
    }
  },
  methods: {
    updateEvent() {
      return;
    }
  }
}
</script>