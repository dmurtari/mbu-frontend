import betweenDate from '../../../src/validators/betweenDate';

describe('The between date validator', () => {
  it('should determine if a date is between two other dates', () => {
    expect(betweenDate('01/11/2001', '01/13/2001')('01/12/2001')).to.be.true;
    expect(betweenDate('01/11/2001', '04/23/2001')('03/21/2001')).to.be.true;
  });

  it('should accept a format string', () => {
    expect(betweenDate('01/17', '03/17', 'MM/YY')('02/17')).to.be.true;
  });

  it('should return false if a date is not between', () => {
    expect(betweenDate('01/11/2001', '01/13/2001')('01/14/2001')).to.be.false;
    expect(betweenDate('01/11/2001', '04/23/2001')('01/10/2001')).to.be.false;
  });

  it('should return false for a date with a format string', () => {
    expect(betweenDate('01/17', '04/17', 'MM/YY')('12/16')).to.be.false;
  });

  it('should not care about order for the surrounding dates', () => {
    expect(betweenDate('01/11/2001', '01/13/2001')('01/12/2001')).to.be.true;
    expect(betweenDate('01/13/2001', '01/11/2001')('01/12/2001')).to.be.true;
  });

  it('should fail for invalid dates', () => {
    expect(betweenDate('01/11/2001', '02/13/2001')('01/32/2001')).to.be.false;
  })
});