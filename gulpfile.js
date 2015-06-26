var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require("gulp-rename");

var paths = {
  sass: ['src/*.scss']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

gulp.task('sass', function () {
  // Transpile SASS files to CSS
  return gulp.src(paths.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('build'))
});

gulp.task('start', function () {
  nodemon({
    script: 'server.js'
  , ext: 'js html'
  , env: { 'NODE_ENV': 'development' }
  });
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch',  'sass']);
