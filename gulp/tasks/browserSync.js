const gulp = require('gulp');
const browserSync = require("browser-sync").create('My Server');
const config = require('../config');

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: config.dest,
    },
    startPath: '/moc/index.html'
  });
});

gulp.task('browserSync.reload', function() {
  browserSync.reload();
});