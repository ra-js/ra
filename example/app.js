/* eslint-disable no-console */
/**
 * Created by karbunkul on 21.05.17.
 */

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const ra = require('../src/index');
const api = new ra();

const definitions = require('./definitions');
const datatypes = require('./datatypes');

api.definition(definitions.raTest);
api.datatype(datatypes.vkUser);

api.datatype({
  type: 'fooBar',
  callback: (value) => {
    return `foo bar ${value}`;
  },
});

api.definition({
  name: 'ra.fooBar',
  args: {
    user: {
      dataType: 'fooBar',
    },
  },
  callback: (args) => {
    return Promise.resolve(args);
  },
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.all('/ra/method/:method', (req, res) => {

  api.call(req, res).then((response) => {
    res.status(response.code).json(response.data);
  });

});

app.listen(3000, () => {
  console.log('=====================================================');
  console.log('Starting app http://lvh.me:3000/ra/method/ra.version');
  console.log('=====================================================');
});
