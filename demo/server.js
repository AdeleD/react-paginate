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
const PER_PAGE = 10;

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

function getPaginatedItems(items, offset) {
  return items.slice(offset, offset + PER_PAGE);
}

app.get('/comments', function (req, res) {
  const items = JSON.parse(fs.readFileSync(DATA));
  const offset = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  const nextOffset = offset + PER_PAGE;
  const previousOffset = offset - PER_PAGE < 1 ? 0 : offset - PER_PAGE;

  const meta = {
    limit: PER_PAGE,
    next: util.format('?limit=%s&offset=%s', PER_PAGE, nextOffset),
    offset: req.query.offset,
    previous: util.format('?limit=%s&offset=%s', PER_PAGE, previousOffset),
    total_count: items.length,
  };

  const json = {
    meta: meta,
    comments: getPaginatedItems(items, offset),
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
