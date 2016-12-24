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
    <div v-if="!showDeleteConfirmation">
      <div class="col-sm-6 col-sm-push-6">
        <div class="pull-right">
          <button class="btn btn-primary"
                  type="submit" 
                  @click.prevent="updateEvent()">Update Event</button>
          <button class="btn btn-default" 
                  @click.prevent="close()">Cancel</button>
        </div>
      </div>
      <div class="col-sm-6 col-sm-pull-6">
        <button class="btn btn-danger"
                @click.prevent="showDeleteConfirm()">Delete Event</button>
        <button class="btn btn-info"
                @click.prevent="setAsCurrent()">Set as the Current Event</button>
      </div>
    </div>   
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
          return this.$store.dispatch('getEvents');
        })
        .then(() => {
          this.close();
        })
        .catch((err) => {
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
      this.$store.dispatch('saveCurrentEvent', this.event.id)
        .then(() => {
          this.$store.dispatch('getEvents');
          this.$emit('close');
        })
        .catch(() => {
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
  }
}
</script>