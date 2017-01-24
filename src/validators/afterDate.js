import moment from 'moment';

export default (afterDate, format = 'MM/DD/YYYY') => {
  return (value, parentVm) => {
    let testDate = moment(value, format);
    if (!testDate.isValid())
      return false;

    const compareTo = typeof afterDate === 'function'
      ? afterDate.call(this, parentVm)
      : parentVm[afterDate]

    return testDate.isAfter(moment(compareTo, format));
  }
}