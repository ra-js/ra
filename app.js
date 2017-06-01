/* eslint-disable no-console */
/**
 * Created by karbunkul on 21.05.17.
 */

const express = require('express');
const app = express();
const ra = require('./src/index');
const api = new ra();

// ra.version
api.addDefinition({
  name: 'ra.version',
  callback: (args) => {
    return {
      engine: `node ${process.version} (${process.arch})`,
      version: `ra v${args.version}`,
    };
  },
});

// ra.definitions
api.addDefinition({
  name: 'ra.methods',
  callback: () => {
    return Object.keys(api.definitions);
  },
});

app.all('/ra/method/:method', (req, res) => {

  api.call(req, res).then((response) => {
    res.json(response);
  });

});

app.listen(3000, () => {
  console.log('====================');
  console.log('Starting app http://localhost:3000/ra/method/ra.version');
  console.log('====================');
});
