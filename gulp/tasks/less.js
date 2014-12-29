var gulp = require('gulp');
var less = require('gulp-less');
var changed = require('gulp-changed');
var sourcemaps = require('gulp-sourcemaps');
var handleErrors = require('../util/handleErrors');
var config = require('../config').less;

gulp.task('less-main'/*, ['images', 'fonts']*/, function () {
  return gulp.src(config.main.src)
    .pipe(changed(config.dest))
    .pipe(sourcemaps.init())
    .pipe(less(config.options))
    .pipe(sourcemaps.write(/*'../less'*/))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});

gulp.task('less-bootstrap', function() {
  return gulp.src(config.bootstrap.src)
    .pipe(changed(config.dest))
    .pipe(sourcemaps.init())
    .pipe(less(config.options))
    .pipe(sourcemaps.write(/*'../less'*/))
    .on('error', handleErrors)
    .pipe(gulp.dest(config.dest));
});

gulp.task('less', ['less-bootstrap', 'less-main']);