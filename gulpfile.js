'use strict';

var fs         = require('fs');
var path       = require('path');
var util       = require('util');
var gulp       = require('gulp');
var browserify = require('browserify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');
var connect    = require('gulp-connect');

var CONFIG = {
  sample: {
    files: {
      data: path.join(__dirname, 'sample', 'data.json'),
      assets: [
        'sample/**/*.html',
        'sample/**/*.css',
        'sample/**/*.js'
      ]
    }
  }
};

gulp.task('connect', function() {
  connect.server({
    root: ['sample', 'styles'],
    livereload: true
  });
});

gulp.task('connect:reload', function() {
  connect.reload();
});

gulp.task('connect:watch', function() {
  gulp.watch('./react_components/*.js', ['app', 'sample', 'connect:reload']);
  gulp.watch('./sample/sample.jsx', ['sample', 'connect:reload']);
  gulp.watch(CONFIG.sample.files.assets, ['connect:reload']);
});

gulp.task('generate:data', function() {
  var comments = {
    'comments': [],
  };
  for (var i = 0; i < 200; i++) {
    comments.comments.push({
      username : util.format('user-%s', i),
      comment  : util.format('This is the comment #%d', i)
    });
  }
  comments.meta = {
    limit: 10,
    next: "?limit=10&offset=10",
    offset: 0,
    previous: null,
    total_count: 200
  };
  fs.writeFileSync(CONFIG.sample.files.data, JSON.stringify(comments, null, 2));
});

gulp.task('watch', function() {
  gulp.watch('./react_components/*.js', ['app', 'sample']);
  gulp.watch('./sample/sample.jsx', ['sample']);
});

gulp.task('app', function() {
  return browserify('./react_components/index.js')
    .transform(reactify)
    .bundle()
    .pipe(source('react-paginate.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./build'));
});

gulp.task('sample', function() {
  return browserify('./sample/sample.jsx')
    .transform(reactify)
    .bundle()
    .pipe(source('sample.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./sample'));
});

gulp.task('serve', ['connect', 'generate:data', 'connect:watch']);
gulp.task('default', ['app', 'sample']);
