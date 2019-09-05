const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const Router = require('../src/Router');
const middleware1 = require('./middleware-1');
const middleware2 = require('./middleware-2');

const server = new Koa();
const port = 3001;

const router = new Router({ prefix: '/api' });

router
  .post({
    path: '/city',
    validate: {
      body: {
        name: {
          type: 'string',
          empty: false,
        },
      },
    },
    middlewares: [middleware1, middleware2],
    handler: ctx => {
      ctx.body = `Your city is: ${ctx.request.body.name}`;
    },
  })
  .get({
    path: '/',
    handler: ctx => {
      ctx.body = 'Hello World';
    },
  });

server.use(bodyparser());
server.use(router.routes());

server.listen(port, err => {
  if (err) {
    global.console.error(err);
    process.exit(1);
  }

  global.console.info(`Server is running on port ${port}`);
});
