var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('style', function () {
    gulp.src('css/style.css')
        .pipe(autoprefixer())
        .pipe(gulp.dest('build'))
});


gulp.task('watch', function () {
    gulp.watch('css/style.css', ['style']);
}); 