'use strict';

var fs         = require('fs');
var path       = require('path');
var util       = require('util');
var gulp       = require('gulp');


gulp.task('generate:data', function(cb) {

  var comments = [];

  for (var i = 0; i < 200; i++) {
    comments.push({
      username : util.format('user-%s', i),
      comment  : util.format('This is the comment #%d', i)
    });
  }

  fs.writeFileSync(path.join(__dirname, 'sample', 'data.json'),
                   JSON.stringify(comments, null, 2));

  return cb();

});
