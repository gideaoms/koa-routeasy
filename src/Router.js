'use strict';

const KRouter = require('koa-router');
const compose = require('koa-compose');
const Validator = require('./Validator');

class Router extends KRouter {
  get({ path, validate, middlewares, handler }) {
    middlewares = this._configMiddlewares({ middlewares, validate });
    super.get(path, middlewares, handler);
    return this;
  }

  post({ path, validate, middlewares, handler }) {
    middlewares = this._configMiddlewares({ middlewares, validate });
    super.post(path, middlewares, handler);
    return this;
  }

  put({ path, validate, middlewares, handler }) {
    middlewares = this._configMiddlewares({ middlewares, validate });
    super.put(path, middlewares, handler);
    return this;
  }

  del({ path, validate, middlewares, handler }) {
    middlewares = this._configMiddlewares({ middlewares, validate });
    super.del(path, middlewares, handler);
    return this;
  }

  all({ path, validate, middlewares, handler }) {
    middlewares = this._configMiddlewares({ middlewares, validate });
    super.all(path, middlewares, handler);
    return this;
  }

  _configMiddlewares({ middlewares = [], validate: validations }) {
    const isMiddlewareAFunction = middleware =>
      typeof middleware === 'function';

    const transformInArray = middleware => [middleware];

    if (isMiddlewareAFunction(middlewares)) {
      middlewares = transformInArray(middlewares);
    }

    const addValidatorBeforeAllMiddlewares = (_validate, _middlewares) => [
      _validate,
      ..._middlewares,
    ];

    if (validations) {
      middlewares = addValidatorBeforeAllMiddlewares(
        new Validator().run(validations),
        middlewares
      );
    }

    return compose([...middlewares]);
  }
}

module.exports = Router;
