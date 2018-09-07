# Koaless

An easy way to create routes in KoaJS

## Installation

```
npm install @gideaoms/koaless
```

## Examples

```
module.exports = {
  "get /cities": {
    controller: "city.controller",
    action: "index",
    middleware: "guest.middleware"
  }
};
```
