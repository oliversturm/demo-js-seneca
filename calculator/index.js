const waitOn = require('wait-on');
const seneca = require('seneca')({
  log: 'silent'
});

waitOn(
  {
    resources: ['tcp:rabbitmq:5672']
  },
  waitErr => {
    if (waitErr) {
      console.error('Error waiting for resources: ', waitErr);
      return;
    }

    seneca
      .use('seneca-amqp-transport')
      .use('./calculator')
      .listen({
        type: 'amqp',
        host: 'rabbitmq',
        pin: 'role:calc'
      })
      .ready(() => {
        console.log('Calculator ready');
      });
  }
);
