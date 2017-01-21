import moment from 'moment'

export default (value, format = 'MM/DD/YYYY') => {
  return moment(value, format).isValid();
}