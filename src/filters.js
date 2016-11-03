import moment from 'moment'

export default function(Vue) {
  Vue.filter('longDate', (value) => {
    return moment(value).format('dddd, MMMM Do, YYYY');
  });
  Vue.filter('shortDate', (value) => {
    return moment(value).format('MM/DD/YYYY');
  });
}