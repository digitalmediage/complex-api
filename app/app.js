'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const logging = require('@kasa/koa-logging');
const requestId = require('@kasa/koa-request-id');
const helmet = require('koa-helmet');
const apmMiddleware = require('./middlewares/apm');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./logger');
// const router = require('./routes/routes');
const Router = require('koa-router');
// eslint-disable-next-line no-unused-vars
const db = require('./database');


class App extends Koa {
  constructor(...params) {
    super(...params);

    // Trust proxy
    this.proxy = true;
    // Disable `console.errors` except development env
    this.silent = this.env !== 'development';

    this.servers = [];

    this._configureMiddlewares();
    this._configureRoutes();
  }

  _configureMiddlewares() {
    this.use(helmet());
    this.use(errorHandler());
    this.use(apmMiddleware());
    this.use(
      bodyParser({
        enableTypes: ['json', 'form'],
        formLimit: '10mb',
        jsonLimit: '10mb',
        onerror: function (err, ctx) {
          ctx.throw(`body parse error => ${err}`, 422);
        }
      })
    );
    this.use(requestId());

    if (process.env.NODE_ENV === 'development') {
      this.use(logging({
        logger,
        overrideSerializers: false
      }));
    }

    this.use(
      cors({
        origin: '*',
        allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH'],
        allowHeaders: ['Content-Type', 'Authorization'],
        exposeHeaders: ['Content-Length', 'Date', 'X-Request-Id']
      })
    );
  }

  _configureRoutes() {
    // Bootstrap application router
    const router = new Router();
    require('./routes')(router);
    this.use(router.routes());
    this.use(router.allowedMethods());
  }

  listen(...args) {
    const server = super.listen(...args);
    this.servers.push(server);
    return server;
  }

  async terminate() {
    // TODO: Implement graceful shutdown with pending request counter
    for (const server of this.servers) {
      server.close();
    }
  }
}

module.exports = App;
