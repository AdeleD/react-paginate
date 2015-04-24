'use strict';

var fs         = require('fs');
var path       = require('path');
var util       = require('util');
var gulp       = require('gulp');
var browserify = require('browserify');
var babelify   = require('babelify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');
var nodemon    = require('gulp-nodemon');
var babel      = require('gulp-babel');

var CONFIG = {
  sample: {
    files: {
      data: path.join(__dirname, 'sample', 'data.json'),
      assets: [
        'sample/**/*.html',
        'sample/**/*.css',
        'sample/**/*.jsx'
      ]
    }
  }
};

gulp.task('generate:data', function(cb) {

  var comments = [];

  for (var i = 0; i < 200; i++) {
    comments.push({
      username : util.format('user-%s', i),
      comment  : util.format('This is the comment #%d', i)
    });
  }

  fs.writeFileSync(CONFIG.sample.files.data, JSON.stringify(comments, null, 2));

  return cb();

});

gulp.task('watch', function() {
  gulp.watch('./react_components/*.js', ['dist', 'sample']);
  gulp.watch('./sample/sample.jsx', ['sample']);
});

gulp.task('sample', function() {
  return browserify('./sample/sample.jsx')
    .transform(babelify)
    .bundle()
    .pipe(source('sample.js'))
    .pipe(buffer())
    .pipe(gulp.dest('./sample'));
});

gulp.task('dist', function() {
  return gulp.src('./react_components/*.js')
    .pipe(babel())
    .pipe(gulp.dest('./dist/'));
});

gulp.task('server:watch', function () {
  nodemon({script: 'server.js'})
    .on('restart', 'server:reload');
});

gulp.task('server:reload', function() {
  gulp.watch('./react_components/*.js', ['dist', 'sample']);
  gulp.watch('./sample/sample.jsx', ['sample']);
});

gulp.task('serve', ['dist', 'sample', 'generate:data', 'server:watch']);
gulp.task('default', ['dist', 'sample']);
