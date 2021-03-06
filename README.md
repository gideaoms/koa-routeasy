# koa-routeasy

The easiest way to route with KoaJS

## Installation

```js
npm install koa-routeasy
```

## Example

```js
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const routeasy = require('koa-routeasy');

const middleware1 = require('./middleware-1');
const middleware2 = require('./middleware-2');

const userController = require('./user-controller');

const server = new Koa();
const port = 3001;

const router = new routeasy.Router({ prefix: '/api' });

router.post({
  path: '/users',
  validate: {
    body: {
      name: {
        type: 'string',
        empty: false,
      },
    },
  },
  middlewares: [middleware1, middleware2],
  handler: userController.create,
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
```

## Used libraries

- [koa-router](https://github.com/ZijianHe/koa-router): `koa-routeasy` is an abstraction from the `koa-router` library, so you can use all lib `koa-router` methods
- [fastest-validator](https://github.com/icebob/fastest-validator): `koa-routeasy` uses the `fastest-validator` library to validate input data

## Author

Gideão Silva - [@gideaoms](https://twitter.com/gideao_ms)
