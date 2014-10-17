var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var config = require('../config')

gulp.task('sample', function() {
    return browserify(config.sample.src)
        .transform(reactify)
        .bundle()
        .pipe(source('sample.js'))
        .pipe(gulp.dest(config.sample.dest));
});