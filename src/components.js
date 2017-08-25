import MaskedInput from 'components/shared/MaskedInput.vue';
import ConfirmDelete from 'components/shared/ConfirmDelete.vue';
import EventsDropdown from 'components/shared/EventsDropdown.vue';
import InlineDropdown from 'components/shared/InlineDropdown.vue';
import PaginatedTable from 'components/shared/PaginatedTable.vue';
import HelpTag from 'components/shared/HelpTag.vue';
import SpinnerPage from 'components/shared/SpinnerPage.vue';
import ClosableError from 'components/shared/ClosableError.vue';
import CenteredSpinner from 'components/shared/CenteredSpinner.vue';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue'

export default function(Vue) {
  Vue.component('masked-input', MaskedInput);
  Vue.component('confirm-delete', ConfirmDelete);
  Vue.component('events-dropdown', EventsDropdown);
  Vue.component('inline-dropdown', InlineDropdown);
  Vue.component('paginated-table', PaginatedTable);
  Vue.component('help-tag', HelpTag);
  Vue.component('loader', PulseLoader);
  Vue.component('spinner-page', SpinnerPage);
  Vue.component('centered-spinner', CenteredSpinner)
  Vue.component('closable-error', ClosableError);
}
