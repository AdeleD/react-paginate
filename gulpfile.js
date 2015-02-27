'use strict';

var gulp       = require('gulp');
var browserify = require('browserify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');

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

gulp.task('default', ['app', 'sample']);
