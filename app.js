/* eslint-disable no-console */
/**
 * Created by karbunkul on 21.05.17.
 */

const express = require('express');
const app = express();
const ra = require('./src/index');
const api = new ra();

app.all('/ra/method/:method', (req, res) => {
  api.addDefinition({});
  api.call(req, res);
});

app.listen(3000, () => {
  console.log('====================');
  console.log('Starting app http://localhost:3000/ra/method');
  console.log('====================');
});
