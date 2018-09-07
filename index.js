"use strict";

const path = require("path");
const Router = require("koa-router");
const includeAll = require("include-all");
const compose = require("koa-compose");

const router = new Router();

/**
 * get path of folder
 * @param {*} folder
 */
const getDirectory = folder => {
  return path.join(process.cwd(), "app", folder);
};

/**
 * Default values
 */
const def = {
  routes: getDirectory("routes"),
  controllers: getDirectory("controllers"),
  middlewares: getDirectory("middlewares"),
  suffix: "route"
};

module.exports = (options = {}) => {
  options = Object.assign({}, def, options);

  /**
   * Load routes
   */
  const regex =
    "(.+)" + (options.suffix ? "\\." + options.suffix : "") + "\\.js$";

  const routes = includeAll({
    dirname: options.routes,
    filter: new RegExp(regex),
    optional: true
  });

  /**
   * Set middlewares
   * @param {*} middlewares
   */
  const getMidleware = (middlewares = []) => {
    if (typeof middlewares === "string") {
      middlewares = [middlewares];
    }
    return compose(
      middlewares.map(middleware =>
        require(`${options.middlewares}/${middleware}`)
      )
    );
  };

  /**
   * Set routes
   */
  Object.values(routes).forEach(route => {
    const endpoint = Object.keys(route)[0];
    const [verb, url] = endpoint.split(" ");
    const resource = route[endpoint];
    const controller = require(`${options.controllers}/${resource.controller}`);
    router[verb](
      url,
      getMidleware(resource.middleware),
      controller[resource.action]
    );
  });

  return router.routes();
};
