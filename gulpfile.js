const { src, dest, task, parallel, watch } = require('gulp'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    webpack = require('webpack-stream');

const path = {
        dist:{
          css:'./dist/css/',
          js:'./dist/js/',
          img:'./dist/img/',
          html: './dist/',
        },
      
        src:{
          sass:'./src/sass/**/*.scss',
          js:'./src/js/*.js',
          img:'./src/img/**/*.*',
          html: './src/**/*.html',
        },
};

sass.compiler = require('node-sass');

task('webpack', function (cb) {
    src(path.src.js)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(dest(path.dist.js));
    cb();
});

task('sass', function (cb) {
  src(path.src.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write())
    .pipe(dest(path.dist.css));
  cb();
});

task('sass:watch', function () {
  watch(path.src.sass, parallel('sass'));
});

task('html:watch', function(){
  watch(path.src.html, parallel('copy:html'));
});


task('copy:html', function(cb) {
    src([
      path.src.html
    ])
    .pipe(dest(path.dist.html));
    cb();
});

task('img', function (cb) {
    src(path.src.img)
      .pipe(imagemin([
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5})
      ]))
      .pipe(dest(path.dist.img));
    cb();
});

task('watch', parallel('webpack', 'sass:watch', 'html:watch'));

task('build', parallel('img'));