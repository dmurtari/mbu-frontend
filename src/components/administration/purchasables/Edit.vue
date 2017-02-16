<template>
  <div>
    <form v-if="!deleting">
      <div class="columns is-multiline">
        <div class="control column is-6">
          <label class="label" for="purchasable-update-item">Item Name</label>
          <input type="text"
                 class="input"
                 id="purchasable-update-item"
                 placeholder="New Item"
                 :class="{ 'is-danger': $v.purchasableUpdate.item.$error }"
                 @blur="$v.purchasableUpdate.item.$touch"
                 v-model="purchasableUpdate.item">
          <span class="help is-danger" v-if="$v.purchasableUpdate.item.$error">
            Please enter the name of the item
          </span>
        </div>
        <div class="control column is-6">
          <label class="label" for="purchasable-update-price">Price</label>
          <input type="number"
                 class="input"
                 placeholder="10.00"
                 id="purchasable-update-price"
                 :class="{ 'is-danger': $v.purchasableUpdate.price.$error }"
                 @blur="$v.purchasableUpdate.price.$touch"
                 v-model="purchasableUpdate.price">
          <span class="help is-danger" v-if="$v.purchasableUpdate.price.$error">
            Please enter the price of the item
          </span>
        </div>
        <div class="control column is-12">
          <label class="label" for="purchasable-update-description">Description</label>
          <textarea class="textarea"
                    id="purchasable-update-description"
                    rows="2"
                    placeholder="Description of this item"
                    v-model="purchasableUpdate.description"></textarea>
        </div>
        <div class="control column is-6">
          <label class="label" for="purchasable-update-min-age">Minimum Age (If Any)</label>
          <input type="number"
                  class="input"
                  id="purchasable-update-min-age"
                  v-model="purchasableUpdate.minimum_age">
        </div>
        <div class="control column is-6">
          <label class="label" for="purchasable-update-max-age">Maximum Age (If Any)</label>
          <input type="number"
                  class="input"
                  id="purchasable-update-max-age"
                  v-model="purchasableUpdate.maximum_age">
        </div>
        <div class="control column is-6">
          <label class="checkbox">
            <input v-model="purchasableUpdate.has_size" type="checkbox"> Allow scouts to select a size
          </label>
        </div>
      </div>
      <button class="button is-primary"
              :disabled="$v.$invalid"
              :class="{ 'is-loading is-disabled': saving }"
              @click.prevent="update()">Save Changes</button>
      <button class="button"
              @click.prevent="close()">Cancel</button>
      <button class="button is-danger is-pulled-right"
                @click.prevent="toggleDelete()">Delete Item</button>
    </form>
    <confirm-delete v-if="deleting"
                    class="container-fluid"
                    :match-text="purchasable.item"
                    :placeholder="'Item Name'"
                    @deleteSuccess="deletePurchasable()"
                    @close="toggleDelete()">
      <span slot="header">
        Do you really want to delete this item? This cannot be undone!
      </span>
      <span slot="help-text">
        Enter the name of the item with correct capitalization to confirm deletion.
        <b>This action cannot be undone, and will remove this item for any scout
        that has purchased it.</b>
      </span>
    </confirm-delete>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';

export default {
  props: {
    purchasable: {
      type: Object,
      required: true
    },
    eventId: { required: true }
  },
  data() {
    return {
      purchasableUpdate: {
        item: '',
        price: '',
        description: '',
        has_size: false,
        minimum_age: '',
        maximum_age: ''
      },
      error: '',
      deleting: false,
      saving: false
    };
  },
  methods: {
    update() {
      this.purchasableUpdate.id = this.purchasable.id;
      this.$store.dispatch('updatePurchasable', {
        eventId: this.eventId,
        purchasable: this.purchasableUpdate
      })
        .then(() => {
          this.error = '';
          this.close();
        })
        .catch((err) => {
          this.error = 'Failed to update item. Please refresh and try again.';
        });
    },
    close() {
      this.$emit('close');
    },
    deletePurchasable() {
      this.$store.dispatch('deletePurchasable', {
        eventId: this.eventId,
        purchasableId: this.purchasable.id
      })
        .then(() => {
          this.error = '';
          this.close();
        })
        .catch((err) => {
          this.error = 'Failed to delete item. Please refresh and try again.';
        });
    },
    toggleDelete() {
      this.deleting = !this.deleting;
    }
  },
  mounted() {
    this.purchasableUpdate.item = this.purchasable.item;
    this.purchasableUpdate.price = this.purchasable.price;
    this.purchasableUpdate.description = this.purchasable.description;
    this.purchasableUpdate.has_size = this.purchasable.has_size;
    this.purchasableUpdate.minimum_age = this.purchasable.minimum_age;
    this.purchasableUpdate.maximum_age = this.purchasable.maximum_age;
  },
  validations: {
    purchasableUpdate: {
      item: { required },
      price: { required }
    }
  }
}
</script>