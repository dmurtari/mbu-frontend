import beforeDate from '../../../src/validators/beforeDate';

describe('The before date validator', () => {
  it('should determine if a date is before another date', () => {
    expect(beforeDate('01/12/2001')('01/11/2001')).to.be.true;
    expect(beforeDate('03/21/2001')('01/11/2001')).to.be.true;
  });

  it('should accept a format string', () => {
    expect(beforeDate('02/17', 'MM/YY')('01/17')).to.be.true;
  });

  it('should return false if a date is not before', () => {
    expect(beforeDate('01/10/2001')('01/11/2001')).to.be.false;
  });

  it('should return false for a date with a format string', () => {
    expect(beforeDate('12/16', 'MM/YY')('01/17')).to.be.false;
  });

  it('should fail for invalid dates', () => {
    expect(beforeDate('01/32/2001')('01/11/2001')).to.be.false;
  })
});