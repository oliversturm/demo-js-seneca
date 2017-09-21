const seneca = require('seneca')({
  log: 'silent'
});

seneca
  .use('./calculator')
  .listen({
    type: 'tcp',
    port: 3000,
    pin: 'role:calc'
  })
  .ready(() => {
    console.log('Calculator ready');
  });
