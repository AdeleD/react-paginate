'use strict';

const fs = require('fs');
const path = require('path');
const util = require('util');
const express = require('express');
const serveStatic = require('serve-static');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const WebpackConfig = require('./webpack.config');

const app = (module.exports.app = exports.app = express());

const ROOT_DIR = path.join(__dirname, '.');
const STYLES_DIR = path.join(__dirname, 'styles');
const DATA = path.join(__dirname, 'data', 'data.json');
const NODE_PORT = process.env.NODE_PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

app.use(serveStatic(ROOT_DIR));
app.use(serveStatic(STYLES_DIR));

app.use(
  webpackDevMiddleware(webpack(WebpackConfig), {
    publicPath: '/build/',
    stats: {
      colors: true,
    },
  })
);

const ITEMS = JSON.parse(fs.readFileSync(DATA));

function getPaginatedItems(items, offset, limit) {
  return items.slice(offset, offset + limit);
}

app.get('/comments', function (req, res) {
  const offset = req.query.offset ? parseInt(req.query.offset) : 0;
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const nextOffset = offset + limit;
  const previousOffset = offset - limit < 1 ? 0 : offset - limit;

  const meta = {
    limit: limit,
    next: util.format('?limit=%d&offset=%d', limit, nextOffset),
    offset: req.query.offset,
    previous: util.format('?limit=%d&offset=%', limit, previousOffset),
    total_count: ITEMS.length,
  };

  const json = {
    meta: meta,
    comments: getPaginatedItems(ITEMS, offset, limit),
  };

  return res.json(json);
});

app.listen(NODE_PORT, function () {
  console.log(
    'Demo server running on %s mode on port %d\nhttp://localhost:%d',
    NODE_ENV,
    NODE_PORT,
    NODE_PORT
  );
});
