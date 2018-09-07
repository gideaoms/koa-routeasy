# Koaless

An easy way to create routes in KoaJS

## Installation

```
npm install @gideaoms/koaless
```

## Examples

### routes

```
module.exports = {
  "get /cities": {
    controller: "city.controller",
    action: "index",
    middleware: "guest.middleware"
  }
};
```

### app.js

```
const Koa = require('koa);
const koaless = require('koaless');

const app = new Koa();

app.use(koaless());

// OR

app.use(koaless({
  routes: "routes_path", // (default => "app/routes")
  controllers: "controllers_path", // (default => "app/controllers")
  middlewares: "middlewares_path", // (default => "app/middlewares")
  suffix: false // (default => ".route") = "city.route.js"
}));
```
