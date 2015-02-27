'use strict';

var gulp       = require('gulp');
var browserify = require('browserify');
var reactify   = require('reactify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');
var connect    = require('gulp-connect');


var SAMPLE_FILES = [
  'sample/**/*.html',
  'sample/**/*.css',
  'sample/**/*.js'
];


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
  gulp.watch(SAMPLE_FILES, ['connect:reload']);
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

gulp.task('serve', ['connect', 'connect:watch'])
gulp.task('default', ['app', 'sample']);
