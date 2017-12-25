const gulp = require('gulp');
const config = require('../config');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const concat = require('gulp-concat-util');

gulp.task('js.clean', function (cb) {
    return rimraf(config.js.dest, cb);
});

gulp.task('js.vendor', function() {
  return gulp.src(
      [config.js.entry + '*.js'])
    .pipe(concat('video.js'))
    .pipe(gulp.dest(config.js.dest));
});
gulp.task('js.app', function(){

});
gulp.task('js.build', function () {
    runSequence(
        'js.clean',
        'js.vendor',
        ['browserSync.reload', 'js.app']
    );
});