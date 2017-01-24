import afterDate from '../../../src/validators/afterDate';

describe('The after date validator', () => {
  it('should determine if a date is after another date', () => {
    expect(afterDate('01/11/2001')('01/12/2001')).to.be.true;
    expect(afterDate('01/11/2001')('03/21/2001')).to.be.true;
  });

  it('should accept a format string', () => {
    expect(afterDate('01/17', 'MM/YY')('02/17')).to.be.true;
  });

  it('should return false if a date is not after', () => {
    expect(afterDate('01/11/2001')('01/10/2001')).to.be.false;
  });

  it('should return false for a date with a format string', () => {
    expect(afterDate('01/17', 'MM/YY')('12/16')).to.be.false;
  });

  it('should fail for invalid dates', () => {
    expect(afterDate('01/11/2001')('01/32/2001')).to.be.false;
  })
});