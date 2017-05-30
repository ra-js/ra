/**
 * Created by karbunkul on 22.05.17.
 */

class Ra {
  constructor() {
    this.definitions = [];
    this.types = [];
  }

  // noinspection JSMethodCanBeStatic
  call(req, res) {
    res.send('Hello world! ' + req.method);
  }

  addDefinition(reference) {

  }
}

module.exports = Ra;
