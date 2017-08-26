import MaskedInput from 'components/shared/MaskedInput.vue';
import ConfirmDelete from 'components/shared/ConfirmDelete.vue';
import EventsDropdown from 'components/shared/EventsDropdown.vue';
import InlineDropdown from 'components/shared/InlineDropdown.vue';
import PaginatedTable from 'components/shared/pagination/PaginatedTable.vue';
import PaginatedItems from 'components/shared/pagination/PaginatedItems.vue';
import HelpTag from 'components/shared/HelpTag.vue';
import ClosableError from 'components/shared/ClosableError.vue';
import SpinnerPage from 'components/shared/loaders/SpinnerPage.vue';
import CenteredSpinner from 'components/shared/loaders/CenteredSpinner.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default function(Vue) {
  Vue.component('masked-input', MaskedInput);
  Vue.component('confirm-delete', ConfirmDelete);
  Vue.component('events-dropdown', EventsDropdown);
  Vue.component('inline-dropdown', InlineDropdown);
  Vue.component('paginated-table', PaginatedTable);
  Vue.component('paginated-items', PaginatedItems);
  Vue.component('help-tag', HelpTag);
  Vue.component('loader', PulseLoader);
  Vue.component('spinner-page', SpinnerPage);
  Vue.component('centered-spinner', CenteredSpinner)
  Vue.component('closable-error', ClosableError);
}
