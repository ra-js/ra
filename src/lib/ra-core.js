/* eslint-disable no-unused-vars */
/**
 * Created by karbunkul on 22.05.17.
 */
const http = require('http');

const RaDefinition = require('./ra-definition');
const RaResult = require('./ra-result');
const RaException = require('./ra-exception');

class Ra {

  constructor(options) {

    this.definitions = {};
    this.types = {};
    function config() {
      return {
        prefix: (options !== undefined && options.prefix) ? options.prefix : 'ra',
      };
    }
    this.config = config();

  }

  call(req, res, methodName) {

    function checkInstanceTypes() {
      if (!(req instanceof http.IncomingMessage)) {
        throw new RaException('req must be instance of http.IncomingMessage');
      }
      if (!(res instanceof http.ServerResponse)) {
        throw new RaException('res must be instance of http.ServerResponse');
      }
    }

    checkInstanceTypes();

    methodName = methodName || req.params.method;
    const definition = this.definitions[methodName];

    return new Promise((resolve, reject) => {
      const response = definition.callback(definition.args);
      const result = new RaResult(response);
      resolve(result);
    });
  }

  addDefinition(reference) {
    const definition = new RaDefinition(reference);
    if (definition.valid) {
      this.definitions[definition.name] = definition;
      console.log('add definition successful');
    }
  }

}

module.exports = Ra;
