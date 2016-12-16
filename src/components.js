import MaskedInput from './components/shared/MaskedInput.vue';
import ConfirmDelete from './components/shared/ConfirmDelete.vue';
import InlineDropdown from './components/shared/InlineDropdown.vue';

export default function(Vue) {
  Vue.component('masked-input', MaskedInput);
  Vue.component('confirm-delete', ConfirmDelete);
  Vue.component('inline-dropdown', InlineDropdown);
}