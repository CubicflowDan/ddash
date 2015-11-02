var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var mainBowerFiles = require('main-bower-files');
var filter = require('gulp-filter');
var order = require("gulp-order");
var fileinclude = require("gulp-file-include");
var uglify = require("gulp-uglify");


// MAIN TASKS

gulp.task('build', ['sass', 'scripts', 'html', 'assets', 'bower']);

gulp.task('build-dev', ['sass-dev', 'scripts-dev', 'html', 'assets', 'bower']);

gulp.task('dev', ['build-dev', 'watch-dev']);

gulp.task('default', ['build']);


var jsFiles = [
    "materialize.js",
    "app.js",
    "homeCtrl.js",
    "*"
];


/// Main watcher task
gulp.task('watch', function () {
    livereload.listen();
    var server = livereload();
    gulp.watch('src/css/*.scss', ['sass']);
    gulp.watch('src/js/**/*.js', ['scripts']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/assets/**/*', ['assets']);
});

gulp.task('watch-dev', function () {
    livereload.listen();
    var server = livereload();
    gulp.watch('src/css/*.scss', ['sass-dev']);
    gulp.watch('src/js/**/*.js', ['scripts-dev']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch('src/assets/**/*', ['assets']);
});


// Helper Tasks
gulp.task('sass', function () {
    return gulp.src('src/css/style.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css/'))
    .pipe(autoprefixer({
        browsers: ['> 1%']
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(livereload());
});

gulp.task('sass-dev', function () {
    return gulp.src('src/css/style.scss')
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['> 1%']
    }))
    .pipe(gulp.dest('dist/css/'))
    .pipe(livereload());
});

gulp.task('html', function() {
    return gulp.src('src/**/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

gulp.task('assets', function() {
    return gulp.src('src/assets/**/*')
    .pipe(gulp.dest('dist/assets/'))
    .pipe(livereload());
});

gulp.task('scripts', function() {
    return gulp.src('src/js/**/.js')
    .pipe(order(jsFiles))
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(livereload());
});

gulp.task('scripts-dev', function() {
    return gulp.src('src/js/**/*.js')
    .pipe(order(jsFiles))
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest('dist/js/'))
    .pipe(livereload());
});


gulp.task('bower-js', function() {
    return gulp.src(mainBowerFiles())
    .pipe(filter('*.js'))
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('bower-css', function() {
    return gulp.src(mainBowerFiles())
    .pipe(filter('*.css'))
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('dist/css/'));
});

gulp.task('bower', ['bower-js', 'bower-css']);