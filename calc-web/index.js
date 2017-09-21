const waitOn = require('wait-on');

const seneca = require('seneca')();
const express = require('express')();

waitOn(
  {
    resources: ['tcp:rabbitmq:5672']
  },
  waitErr => {
    if (waitErr) {
      console.error('Error waiting for resources: ', waitErr);
      return;
    }

    express.use(require('cors')());
    express.use(require('morgan')('dev'));

    const routes = [
      {
        // Careful, this pin is special. It has to be a string,
        // and it doesn't like a space before the '*'!
        pin: 'role: proxy, cmd:*',
        prefix: '/api',
        map: {
          add: {
            GET: true,
            suffix: '/:x/:y'
          },
          mult: {
            GET: true,
            suffix: '/:x/:y'
          },
          square: {
            GET: true,
            suffix: '/:x'
          }
        }
      }
    ];

    const config = {
      routes,
      adapter: require('seneca-web-adapter-express'),
      context: express
    };

    seneca
      .use('seneca-amqp-transport')
      .add('role:proxy', function(m, r) {
        this.act(
          {
            role: 'calc',
            cmd: m.cmd,
            ...m.args.params
          },
          r
        );
      })
      .client({
        type: 'amqp',
        host: 'rabbitmq',
        //port: 3000,
        pin: 'role: calc'
      })
      .use('seneca-web', config)
      .ready(() => {
        const server = seneca.export('web/context')();
        server.listen(8080, () => {
          console.log('Web Service listening on port 8080');
        });
      });
  }
);
