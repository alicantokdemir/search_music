var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('default', ['index', 'js', 'styles', 'assets', 'watch']);

gulp.task('assets', function () {
    return gulp.src('Assets/**/*')
        .pipe(gulp.dest('docs/Assets'));
})

gulp.task('js', function () {
    return gulp.src(['app/*.js', 'bower_components/**/*.min.js'])
        .pipe(gulp.dest('docs'))
});

gulp.task('styles', function () {
    return gulp.src('styles/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('docs/styles/'));
});

gulp.task('index', function () {
    return gulp.src('index.html')
        .pipe(gulp.dest('docs'))
});

gulp.task('watch', function () {
    return gulp.watch(['app/*.js', 'styles/*.scss', 'index.html'], ['js', 'styles', 'index']);
});