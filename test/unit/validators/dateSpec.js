import date from '../../../src/validators/date';

describe('The date validator', () => {
  it('should validate a date', () => {
    expect(date('01/11/2001')).to.be.true;
    expect(date('1/11/2001')).to.be.true;
  });

  it('should not validate a bad date', () => {
    expect(date('00/00/0000')).to.be.false;
    expect(date('02/30/2000')).to.be.false;
    expect(date('13/20/2001')).to.be.false;
  });

  it('should allow a custom format', () => {
    expect(date('23/01/2001', 'DD/MM/YYYY')).to.be.true;
    expect(date('23/23/2001', 'DD/MM/YYYY')).to.be.false;
    expect(date('17/01/31', 'YY/MM/DD')).to.be.true;
    expect(date('17/28/20', 'YY/MM/DD')).to.be.false
  });
});