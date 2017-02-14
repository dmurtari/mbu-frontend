<template>
  <div class="box">
    <h4 class="title is-4">Add a New Item</h4>
    <p>
      Add a new purchasable item for this event by filling out the form below.
    </p>
    <br>
    <div class="notification is-danger" v-if="error">
      <p>
        {{ error }}
      </p>
    </div>
    <form>
      <div class="columns is-multiline">
        <div class="control column is-6">
          <label class="label" for="purchasable-create-item">Item Name</label>
          <input type="text"
                 class="input"
                 id="purchasable-create-item"
                 placeholder="New Item"
                 v-model="purchasable.item">
        </div>
        <div class="control column is-6">
          <label class="label" for="purchasable-create-price">Price</label>
          <masked-input mask="99.99"
                        placeholder="00.00"
                        id="purchasable-create-price"
                        v-model="purchasable.price"></masked-input>
        </div>
        <div class="control column is-12">
          <label class="label" for="purchasable-create-description">Description</label>
          <textarea class="textarea"
                    id="purchasable-create-description"
                    rows="2"
                    placeholder="Description of this item"
                    v-model="purchasable.description"></textarea>
        </div>
        <div class="control column is-6">
          <label class="checkbox">
            <input v-model="hasAgeRestriction" type="checkbox"> This item is age restricted
          </label>
        </div>
        <div class="control column is-6">
          <label class="checkbox">
            <input v-model="purchasable.has_size" type="checkbox"> Allow scouts to select a size
          </label>
        </div>
        <template v-if="hasAgeRestriction">
          <div class="control column is-6">
            <label class="label" for="purchasable-min-age">Minimum Age (If Any)</label>
            <input type="number"
                   class="input"
                   id="purchasable-min-age"
                   v-model="purchasable.minimum_age">
          </div>
          <div class="control column is-6">
            <label class="label" for="purchasable-max-age">Maximum Age (If Any)</label>
            <input type="number"
                   class="input"
                   id="purchasable-max-age"
                   v-model="purchasable.maximum_age">
          </div>
        </template>
      </div>
      <button class="button is-primary"
              :class="{ 'is-loading is-disabled': creating }"
              @click.prevent="createPurchasable()">Create Item</button>
      <button class="button"
              @click.prevent="close()">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    eventId: { required: true }
  },
  data() {
    return {
      creating: false,
      error: '',
      hasAgeRestriction: false,
      purchasable: {
        item: '',
        description: '',
        price: '',
        has_size: false,
        maximum_age: '',
        minimum_age: ''
      }
    };
  },
  methods: {
    createPurchasable() {
      let purchasable = {};
      purchasable.item = this.purchasable.item;
      purchasable.description = this.purchasable.description;
      purchasable.price = this.purchasable.price;
      purchasable.has_size = this.purchasable.has_size;
      purchasable.maximum_age = this.purchasable.maximum_age ?
                                  this.purchasable.maximum_age : null;
      purchasable.minimum_age = this.purchasable.minimum_age ?
                                  this.purchasable.minimum_age : null;

      this.$store.dispatch('createPurchasable', {
        eventId: this.eventId,
        purchasable: purchasable
      })
        .then(() => {
          this.error = '';
          this.close();
        })
        .catch((err) => {
          console.log(err)
          this.error = 'Failed to create item. Please refresh and try again.';
        })
    },
    close() {
      this.$emit('close');
    }
  }
}
</script>
