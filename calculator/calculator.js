module.exports = function() {
  this.add('role: calc, cmd: add', (m, r) => {
    r(null, {
      result: m.x + m.y
    });
  });

  this.add('role: calc, cmd: mult', (m, r) => {
    r(null, {
      result: m.x * m.y
    });
  });

  this.add('role: calc, cmd: square', (m, r) => {
    r(null, {
      result: m.x * m.x
    });
  });
};
