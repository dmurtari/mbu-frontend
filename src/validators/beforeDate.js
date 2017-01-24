import moment from 'moment';

export default (beforeDate, format = 'MM/DD/YYYY') => {
  return (value, parentVm) => {
    let testDate = moment(value, format);
    if (!testDate.isValid())
      return false;

    const compareTo = typeof beforeDate === 'function'
      ? beforeDate.call(this, parentVm)
      : parentVm[beforeDate]

    return testDate.isBefore(moment(compareTo, format));
  }
}