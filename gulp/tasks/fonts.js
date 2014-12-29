/**
 * Created by Chaosik on 2014-11-15.
 */
var gulp = require('gulp');
var changed = require('gulp-changed');
var config = require('../config').fonts;

gulp.task('fonts', function() {
  return gulp.src(config.src)
    //.pipe(changed(config.dest))
    .pipe(gulp.dest(config.dest));
});