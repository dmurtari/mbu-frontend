import moment from 'moment'

export default beforeDate => (first, format = 'MM/DD/YYYY') => {
  return (value, parentVm) => {
    console.log('Comparing', first, value);
    let testDate = moment(value, format);
    if (!firstDate.isValid() || !testDate.isValid())
      return false;

    const compareTo = typeof beforeDate === 'function'
      ? beforeDate.call(this, parentVm)
      : parentVm[beforeDate]

    return testDate.isBefore(firstDate);
  }
}