'use strict';

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var reactify = require('reactify');
var watchify = require('watchify');


var dest = "./build";
var src = './react_components';

var config = {
  pagination: {
    src: src + "/index.js",
    dest: dest
  },
  sample: {
    src: "./sample/sample.jsx",
    dest: "./sample"
  }
};


gulp.task('default', ['pagination', 'sample', 'watch']);


gulp.task('watch', function(){
  bundler.on('update', function(){
    gulp.start('pagination');
  });
  sampleBundler.on('update', function(){
    gulp.start('sample');
  });
});


var bundler = watchify(browserify(config.pagination.src, {
  cache: {},
  packageCache: {},
  fullPaths: true,
  standalone: 'react-paginate',
  debug: true
}));

gulp.task('pagination', function() {
    var browserifyStream = bundler.bundle()
        .pipe(source('react-paginate.js'))
        .pipe(gulp.dest(config.pagination.dest));

    return browserifyStream;
});


var sampleBundler = watchify(browserify(config.sample.src, {
  cache: {},
  packageCache: {},
  fullPaths: true,
  standalone: 'sample',
  debug: true
}));
sampleBundler.transform(reactify);


gulp.task('sample', function(){
  var browserifyStream = sampleBundler.bundle()
    .pipe(source('sample.js'))
    .pipe(gulp.dest(config.sample.dest));

  return browserifyStream;
});
