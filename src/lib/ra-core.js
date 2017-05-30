/**
 * Created by karbunkul on 22.05.17.
 */

const result = require('./ra-result');

class Ra {

  constructor() {
    this.definitions = [];
    this.types = [];
  }

  call(req, res) {
    res.send('Hello world! ' + req.method);
  }

  addDefinition(reference) {

  }
}

module.exports = Ra;
