/* eslint-disable no-unused-vars */
/**
 * Created by karbunkul on 22.05.17.
 */
const http = require('http');

const RaDefinition = require('./ra-definition');
const RaDatatype = require('./ra-datatype');
const RaResult = require('./ra-result');
const RaError = require('./ra-error');
const RaException = require('./ra-exception');

class Ra {

  constructor(options) {

    this.definitions = {};
    this.types = {};

    function config() {
      return {
        prefix: (options !== undefined && options.prefix) ?
          options.prefix : 'ra',
      };
    }

    this.config = config();

    console.log(this.config);

    // ra.version
    this.addDefinition({
      name: 'ra.version',
      callback: () => {
        return {
          engine: `node ${process.version} (${process.arch})`,
          version: 'ra v1.0',
        };
      },
    });

    // ra.methods
    this.addDefinition({
      name: 'ra.methods',
      callback: () => {
        return Object.keys(this.definitions);
      },
    });

    // ra.datatypes
    this.addDefinition({
      name: 'ra.datatypes',
      callback: () => {
        return Object.keys(this.types);
      },
    });

    // types

    this.addDatatype({
      type: 'number',
      callback: (value) => {
        return parseInt(value);
      },
    });

    this.addDatatype({
      type: 'float',
      callback: (value) => {
        return parseFloat(value);
      },
    });

  }

  call(req, res, methodName) {

    const prefix = `x-${this.config.prefix.replace('x-', '')}-`;
    const types = this.types;

    function checkInstanceTypes() {
      if (!(req instanceof http.IncomingMessage)) {
        throw new RaException('req must be instance of http.IncomingMessage');
      }
      if (!(res instanceof http.ServerResponse)) {
        throw new RaException('res must be instance of http.ServerResponse');
      }
    }

    function paramValues(definition) {

      const values = {};

      const headers = req.headers;
      const params = req.query;
      const body = req.body;

      console.log(req.query);

      for (const name in definition.args) {
        const arg = definition.args[name];
        arg.require = (arg.defaultValue === undefined);
        const datatype = types[arg.dataType];

        if (arg.require) {
          const value = headers[prefix + name] || body[name] ||  params[name];
          if (value === undefined){
            return new RaError(403,
              `Missing required argument '${name}'`);
          }else{
            values[name] = datatype.callback(value);
          }
        }
      }

      return values;
    }

    checkInstanceTypes();

    methodName = methodName || req.params.method;
    const definition = this.definitions[methodName];

    const values = paramValues(definition);

    if (values instanceof RaError) {
      return Promise.resolve(new RaResult(values));
    }else {
      return new Promise((resolve, reject) => {
        Promise.all(Object.values(values)).then((resolveAll) => {
          const params = Object.assign({}, Object.keys(values), resolveAll);

          let index = 0;
          for (var key in values) {
            values[key] = resolveAll[index];
            index++;
          }

          const response = definition.callback(values);
          resolve(new RaResult(response));
        })

      });

    }

  }

  addDefinition(reference) {
    const definition = new RaDefinition(reference);
    if (definition.valid) {
      this.definitions[definition.name] = definition;
    }
  }

  addDatatype(reference) {
    const datatype = new RaDatatype(reference);
    if (datatype.valid) {
      this.types[datatype.type] = datatype;
    }
  }

  errorInstance(code, message) {
    return new RaError(code, message);
  }

}

module.exports = Ra;
