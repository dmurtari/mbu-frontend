import moment from 'moment';
import _ from 'lodash';

export default function(Vue) {
  Vue.filter('longDate', (value) => {
    return moment(value).format('dddd, MMMM Do, YYYY');
  });
  Vue.filter('shortDate', (value) => {
    return moment(value).format('MM/DD/YYYY');
  });
  Vue.filter('capitalize', (value) => {
    return _.capitalize(value);
  });
  Vue.filter('titleCase', (value) => {
    return _.startCase(_.toLower(value));
  });
}