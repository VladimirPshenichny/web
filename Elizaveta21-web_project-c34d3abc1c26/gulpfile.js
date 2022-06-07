var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var less = require('gulp-less');
//var imagemin = require('gulp-imagemin');
var csso = require('gulp-csso');
var connect = require('gulp-connect');

gulp.task('less', function() {
  return gulp.src("app/less/*.less")
    .pipe(less())
    .pipe(csso())
    .pipe(gulp.dest("dist/css"))
});

gulp.task('csso', function () {
  return gulp.src('app/css/*.css')
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('browser-sync', function () {
  var files = [
    '*.html',
    'app/img/*.*',
    'dist/css/*.css'
  ];

browserSync.init(files, {
    server: {
      baseDir: '.'
    }
  });
});

// Локальный сервер для разработки
gulp.task('http-server', function() {
  connect.server();
});

/*
gulp.task('images', function() {
  gulp.src('./app/img/*.*')
      .pipe(imagemin())
      .pipe(gulp.dest('./dist/img'))

});
*/

gulp.watch('app/less/*.less', ['less']);
//gulp.watch('app/css/*.css', ['csso'])
gulp.task('default', ['less', 'csso', 'browser-sync', 'http-server']);
