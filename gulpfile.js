/**
 * Created by sade on 6/26/18.
 */
const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('minify-images', () =>
gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);