const gulp = require('gulp');
const config = require('../config');
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const $ = require("gulp-load-plugins")();
const assemble = require('assemble');
const extname = require('gulp-extname');

gulp.task('moc.clean', function (cb) {
  return rimraf(config.moc.dest, cb);
});

gulp.task('moc.assemble', function () {
  return gulp.src(config.moc.entry + '*.hbs')
    .pipe(extname())
    .pipe(gulp.dest(config.moc.dest));
});

gulp.task('moc.prettify', function() {
  return gulp.src(config.moc.dest + '*.html')
    .pipe($.prettify({indent_size: 2}))
    .pipe(gulp.dest(config.moc.dest))
});

gulp.task('moc.build',function() {
  runSequence(
    'moc.clean',
    'moc.assemble',
    ['browserSync.reload','moc.prettify']
  );
});