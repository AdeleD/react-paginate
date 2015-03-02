'use strict';

var fs          = require('fs');
var path        = require('path');
var util        = require('util');
var express     = require('express');
var serveStatic = require('serve-static');
var app         = module.exports.app = exports.app = express();

var ROOT_DIR   = path.join(__dirname, 'sample');
var STYLES_DIR = path.join(__dirname, 'styles');
var DATA       = path.join(__dirname, 'sample', 'data.json');
var NODE_PORT  = process.env.NODE_PORT || 3000;
var NODE_ENV   = process.env.NODE_ENV || 'development';
var PER_PAGE   = 10;


app.use(serveStatic(ROOT_DIR));
app.use(serveStatic(STYLES_DIR));


function getPaginatedItems(items, page) {
  page = page || 1;
  var offset = (page - 1) * PER_PAGE;
  return items.slice(offset, offset + PER_PAGE);
}


app.get('/comments', function(req, res) {

  var items        = JSON.parse(fs.readFileSync(DATA));
  var page         = req.query.page ? parseInt(req.query.page, 10) : 0;
  var nextPage     = page + 1;
  var previousPage = (page < 1) ? 1 : page - 1;

  var meta = {
    limit       : PER_PAGE,
    next        : util.format('?limit=%s&page=%s', PER_PAGE, nextPage),
    page        : req.query.page,
    previous    : util.format('?limit=%s&page=%s', PER_PAGE, previousPage),
    total_count : items.length
  };

  var json = {
    meta     : meta,
    comments : getPaginatedItems(items, page),
  };

  return res.json(json);

});


app.listen(NODE_PORT, function() {
  console.log('Server running on %s mode on port %d', NODE_ENV, NODE_PORT);
});
