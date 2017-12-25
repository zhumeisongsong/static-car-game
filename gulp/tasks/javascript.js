const gulp = require('gulp');
const config = require('../config');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const concat = require('gulp-concat-util');

gulp.task('js.clean', function (cb) {
  return rimraf(config.js.dest, cb);
});

gulp.task('js.vendor', function () {
  return gulp.src([
    config.js.entry + 'vendor/swiper-3.4.1.jquery.min.js',
    config.js.entry + 'vendor/swiper.animate1.0.2.min.js',
    config.js.entry + 'vendor/fastclick.js',
    config.js.entry + 'vendor/countUp.min.js',
    config.js.entry + 'vendor/wScratchPad.js'
  ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(config.js.dest));
});
gulp.task('js.app', function () {
  return gulp.src([
    config.js.entry + 'app/app.js',
  ])
    .pipe(concat('app.js'))
    .pipe(gulp.dest(config.js.dest));
});
gulp.task('js.build', function () {
  runSequence(
    'js.clean',
    'js.vendor',
    ['browserSync.reload', 'js.app']
  );
});