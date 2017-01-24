import moment from 'moment'

export default (first, format = 'MM/DD/YYYY') => {
  return value => {
    let firstDate = moment(first, format);
    let testDate = moment(value, format);
    if (!firstDate.isValid() || !testDate.isValid())
      return false;

    return testDate.isAfter(firstDate);
  }
}