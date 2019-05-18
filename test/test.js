const expect = require('chai').expect;

function sum(a, b) {
  return a + b;
}

//console.log(this)


describe('sum', function () {
    it('should return sum of arguments', function () {
        //console.log(this)
        expect(sum(1, 2), 'sum incorrect').to.equal(3);
    });
  });