import MaskedInput from './components/shared/MaskedInput.vue';
import ConfirmDelete from './components/shared/ConfirmDelete.vue';
import EventsDropdown from './components/shared/EventsDropdown.vue';
import InlineDropdown from './components/shared/InlineDropdown.vue';
import PaginatedTable from './components/shared/PaginatedTable.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default function(Vue) {
  Vue.component('masked-input', MaskedInput);
  Vue.component('confirm-delete', ConfirmDelete);
  Vue.component('events-dropdown', EventsDropdown);
  Vue.component('inline-dropdown', InlineDropdown);
  Vue.component('paginated-table', PaginatedTable);
  Vue.component('loader', PulseLoader);
}