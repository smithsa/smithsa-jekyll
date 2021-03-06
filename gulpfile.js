/**
 * Created by sade on 6/26/18.
 */

var gulp = require('gulp'),
    csso = require('gulp-csso');
    uglify = require('gulp-uglify')
    runSequence = require('run-sequence')
    del = require('del'),
    rename = require('gulp-rename'),
    gulp = require('gulp'),
    imagemin = require('gulp-imagemin');

//optimize image
gulp.task('minify-images', () =>
gulp.src('assets/src/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('assets/dist/images/'))
);


//javascript scripts
gulp.task('js-scripts', function() {
    return gulp.src('assets/src/js/**/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/dist/js'))
});

gulp.task('stylesheets', function () {
    return gulp.src('assets/src/css/**/*.css')
        // Minify the file
        .pipe(csso())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/dist/css'))
});

gulp.task('fonts', function() {
    return gulp.src('assets/src/fonts/**/*')
        .pipe(gulp.dest('assets/dist/fonts/'))
});

gulp.task('clean', () => del(['assets/dist/*']));


// Gulp task to minify all files
gulp.task('default', ['clean'], function () {
    runSequence(
        'js-scripts',
        'stylesheets',
        'minify-images',
        'fonts'
    );
});

gulp.task('watch', function (){
    gulp.watch('assets/src/css/style.css', ['stylesheets']);
});