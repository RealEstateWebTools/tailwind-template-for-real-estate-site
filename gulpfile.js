const gulp = require('gulp'); // Task runner
const browserSync = require('browser-sync').create(); // Sync on browser after functions
const sass = require('gulp-sass'); // Convert sass file to css files
const plumber = require('gulp-plumber'); // Handling errors
const concat = require('gulp-concat'); // To combine all js or css files into one
const postcss = require('gulp-postcss');

const { series, parallel } = require('gulp');

// compile tailwind css file from src/vendors to dist/css
function tailwind(done) {
      gulp.src('./src/vendors/tailwind.css')
            .pipe(postcss())
            .pipe(gulp.dest('dist/css'))
            .pipe(browserSync.stream());
      done();
}

// Copy js files from src/js to dist/js
function js(done) {
      gulp.src(['src/js/*.js'])
            .pipe(plumber())
            .pipe(gulp.dest('dist/js'))
            .pipe(browserSync.stream());
      done();
}

// Copy html files to from src/ to dist/
function html(done) {
      gulp.src('src/*.html').pipe(gulp.dest('dist')).pipe(browserSync.stream());
      done();
}

// copy images from src/img to dist/img
function img(done) {
      gulp.src('src/images/*')
            .pipe(gulp.dest('dist/images'))
            .pipe(browserSync.stream());
      done();
}

// copy, compile and optimize scss files from src/scss to css/app.css
function scss(done) {
      gulp.src('src/scss/app.scss')
            .pipe(plumber())
            .pipe(sass())
            .pipe(concat('main.css'))
            .pipe(gulp.dest('dist/css'))
            .pipe(browserSync.stream());
      done();
}

function watch() {
      browserSync.init({
            server: './dist',
      });
      gulp.watch('./tailwind.config.js', tailwind);
      gulp.watch('src/vendors/tailwind.css', tailwind);
      gulp.watch('src/*.html', parallel(html, tailwind));
      gulp.watch('src/scss/**/*.scss', scss);
      gulp.watch('src/js/*.js', js);
      gulp.watch('src/images/*', img);
}

exports.html = html;
exports.scss = scss;
exports.js = js;
exports.img = img;
exports.watch = watch;

exports.default = series(parallel(html, scss, tailwind, js, img), watch);
