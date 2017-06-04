/**
 * Created by karbunkul on 21.05.17.
 */

const RaError = require('./ra-error');

class RaResult {

  constructor(response) {

    if (response instanceof RaError) {
      return {
        status: 'fail',
        code: response.code,
        message: response.message,
      };
    }else{
      return {
        status: 'ok',
        response: response,
      };
    }
  }

}

module.exports = RaResult;
