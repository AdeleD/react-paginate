var gulp = require('gulp');
var config = require('../config');

gulp.task('watch', function() {
  gulp.watch(config.pagination.src, ['pagination']);
  gulp.watch(config.sample.src, ['sample']);
});