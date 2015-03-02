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


function getPaginatedItems(items, offset) {
  return items.slice(offset, offset + PER_PAGE);
}


app.get('/comments', function(req, res) {

  var data           = JSON.parse(fs.readFileSync(DATA));
  var items          = data.comments;
  var offset         = req.query.offset ? parseInt(req.query.offset, 10) : 0;
  var nextOffset     = offset + PER_PAGE;
  var previousOffset = (offset - PER_PAGE < 1) ? 0 : offset - PER_PAGE;

  var meta = {
    limit       : PER_PAGE,
    next        : util.format('?limit=%s&offset=%s', PER_PAGE, nextOffset),
    offset      : req.query.offset,
    previous    : util.format('?limit=%s&offset=%s', PER_PAGE, previousOffset),
    total_count : items.length
  };

  var json = {
    meta     : meta,
    comments : getPaginatedItems(items, offset)
  };

  return res.json(json);

});


app.listen(NODE_PORT, function() {
  console.log('Server running on %s mode on port %d', NODE_ENV, NODE_PORT);
});
