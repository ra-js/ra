/**
 * Created by karbunkul on 21.05.17.
 */

const RaException = require('./ra-exception');

class RaDefinition {

  constructor(reference) {
    if (reference instanceof Object && !Array.isArray(reference)) {
      // if (check(reference)) {
      //
      // }
    }
    else {
      throw new RaException('Reference must be object');
    }

    function check(reference) {

      const requireFields = ['name', 'description', 'args', 'method', 'callback'];

      return true;
    }
  }
}

module.exports = RaDefinition;
