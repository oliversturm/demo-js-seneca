const Seneca = require('seneca');
const expect = require('chai').expect;

function test(done) {
  return Seneca({
    log: 'test'
  })
    .test(done /*, 'print' */)
    .use('../calculator');
}

describe('calculator', function() {
  it('add should add correctly', function(done) {
    test(done).act(
      {
        role: 'calc',
        cmd: 'add',
        x: 10,
        y: 32
      },
      (err, res) => {
        expect(res).to.eql({
          result: 42
        });
        done();
      }
    );
  });

  it('mult should mult correctly', function(done) {
    test(done).act(
      {
        role: 'calc',
        cmd: 'mult',
        x: 10,
        y: 32
      },
      (err, res) => {
        expect(res).to.eql({
          result: 320
        });
        done();
      }
    );
  });

  it('add should add correctly', function(done) {
    test(done).act(
      {
        role: 'calc',
        cmd: 'square',
        x: 10
      },
      (err, res) => {
        expect(res).to.eql({
          result: 100
        });
        done();
      }
    );
  });
});
