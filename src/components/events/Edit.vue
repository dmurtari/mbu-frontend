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
                        v-model="eventUpdate.price"></masked-input>
        </div>
        <div class="control column is-6">
          <label class="label" for="event-edit-date">Date</label>
          <masked-input mask="99/99/9999"
                        placeholder="mm/dd/yyyy"
                        id="event-edit-date"
                        v-model="eventUpdate.date">
        </div>
        <div class="control column is-6">
          <label class="label" for="event-edit-open">Registration Opens</label>
          <masked-input mask="99/99/9999"
                        placeholder="mm/dd/yyyy"
                        id="event-edit-open"
                        v-model="eventUpdate.registration_open">
        </div>
        <div class="control column is-6">
          <label class="label" for="event-edit-close">Registration Closes</label>
          <masked-input mask="99/99/9999"
                        placeholder="mm/dd/yyyy"
                        id="event-create-close"
                        v-model="eventUpdate.registration_close">
        </div>
      </div>
      <div>
          <button class="button is-primary"
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
  }
}
</script>