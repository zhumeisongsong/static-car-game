const gulp = require('gulp');
const config = require('../config');
const $ = require("gulp-load-plugins")();

gulp.task('watch', function(){
  $.watch([config.stylesheet.entry + '*.scss', config.stylesheet.entry + '**/*.scss'], function(event){
    gulp.start('css.build');
  });
  $.watch([config.moc.entry + '**/*.{hbs,json,yml}'], function(event){
    gulp.start('moc.build');
  });
  // $.watch([config.image.entry + '**'], function(event){
  //   gulp.start('image.build');
  // });
  $.watch([config.js.entry + '*.js',config.js.entry + '**/*.js'], function(event){
    gulp.start('js.build');
  });
});