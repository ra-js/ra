/**
 * Created by karbunkul on 21.05.17.
 */

const RaException = require('./ra-exception');

class RaDefinition {
  constructor(reference) {
    function check() {
      const requireFields = ['name', 'description', 'args', 'method', 'callback'];
      for (const field in requireFields) {
        if (!(field in reference)) {
          throw new RaException('');
        }
      }
      return true;
    }
    if (reference instanceof Object && !Array.isArray(reference)) {
      if (check(reference)) {
        console.log(1);
      }
    }
    else {
      throw new RaException('Reference must be object');
    }
  }
}

module.exports = RaDefinition;
