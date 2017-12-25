const gulp = require('gulp');
gulp.task('default', ['browserSync','moc.build', 'css.build','js.build','image.build','watch']);
