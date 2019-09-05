# Koaless

The easiest way to route with KoaJS

## Installation

```
npm install @gideaoms/koaless
```

## Practical Example

```
const Koa = require('koa');
const bodyparser = require('koa-bodyparser');
const koaless = require('@gideaoms/koaless');

const middleware1 = require('./middleware-1');
const middleware2 = require('./middleware-2');

const userController = require('./user-controller');

const server = new Koa();
const port = 3001;

const router = new koaless.Router();

router
  .post({
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
```

## Used libraries

- Router: [koa-router](https://github.com/ZijianHe/koa-router)
- Validation: [fastest-validator](https://github.com/icebob/fastest-validator)

## Author

Gideão Silva - [@gideaoms](https://twitter.com/gideao_ms)
