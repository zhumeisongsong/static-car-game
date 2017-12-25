const gulp = require('gulp');
const config = require('../config');
const $ = require("gulp-load-plugins")();
const runSequence = require('run-sequence');
const rimraf = require('rimraf');
const concat = require('gulp-concat-util');

gulp.task('css.clean', function (cb) {
    return rimraf(config.stylesheet.dest, cb);
    });

gulp.task('css.vendor', function () {
    return gulp.src(config.stylesheet.entry + 'vendor/*.css')
        .pipe(concat('vendor.css'))
        .pipe($.plumber({
            errorHandler: $.notify.onError('<%= error.message %>')
        }))
        .pipe(gulp.dest(config.stylesheet.dest));
});

gulp.task('css.style', function () {
    return gulp.src(config.stylesheet.entry + 'style.scss')
        .pipe($.plumber({
            errorHandler: $.notify.onError('<%= error.message %>')
        }))
        .pipe($.sass({
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest(config.stylesheet.dest));
});

gulp.task('css.autoprefixer', function () {
    return gulp.src(config.stylesheet.dest + '**.css')
        .pipe($.autoprefixer({
            browsers: ['IE >=8', 'android>=4','ios>=7','last 2 versions','>2%'],
            cascade: false
        }))
        .pipe(gulp.dest(config.stylesheet.dest));
});

gulp.task('css.min', function () {
    return gulp.src(['!' + config.stylesheet.dest + '*.min.css', config.stylesheet.dest + '*.css'])
        .pipe($.cssmin())
        .pipe($.rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(config.stylesheet.dest));
});

gulp.task('css.build', function () {
    runSequence(
        'css.clean',
        'css.vendor',
        'css.style',
        'css.autoprefixer',
        ['browserSync.reload', 'css.min']
    );
});