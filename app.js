/* eslint-disable no-console */
/**
 * Created by karbunkul on 21.05.17.
 */

const express = require('express');
const app = express();
const ra = require('./src/index');
const api = new ra();

api.addDefinition({
  name: 'ra.test',
  args: {
    param: {
      dataType: 'number',
    },
  },
  callback: () => {
    return api.errorInstance(404, 'Page not found');
  },
});

app.all('/ra/method/:method', (req, res) => {

  api.call(req, res).then((response) => {
    res.json(response);
  });

});

app.listen(3000, () => {
  console.log('=====================================================');
  console.log('Starting app http://lvh.me:3000/ra/method/ra.version');
  console.log('=====================================================');
});
