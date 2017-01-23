import moment from 'moment'

export default (first, second, format = 'MM/DD/YYYY') => {
  return value => {
    let firstDate = moment(first, format);
    let secondDate = moment(second, format);
    let testDate = moment(value, format);
    if (!firstDate.isValid() || !secondDate.isValid() || !testDate.isValid())
      return false;

    return testDate.isBetween(firstDate, secondDate) || testDate.isBetween(secondDate, firstDate);
  }
}