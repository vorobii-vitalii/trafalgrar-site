const { src, dest, parallel, series, watch } = require('gulp');

const gulpPug = require('gulp-pug');
const gulpStylus = require('gulp-stylus');
const gulpCSSO = require('gulp-csso');
const gulpAutoPrefixer = require('gulp-autoprefixer');
const gulpNotify = require('gulp-notify');
const gulpSourceMaps = require('gulp-sourcemaps');
const gulpBrowserSync = require('browser-sync').create();
const gulpConcat = require('gulp-concat');
const gulpTinyPng = require('gulp-tinypng-unlimited');
const gulpPlumber = require('gulp-plumber');

// Options

const pugOptions = {
  pretty: true,
};

const autoPrefixerOptions = {
  browsers: ['last 10 versions'],
};

const stylusOptions = {
  'include css': true,
};

const notifyOptions = {
  errorHandler: null,
};

/*
const jsLibLocations = [
  "node_modules/jquery/dist/jquery.js",
  "node_modules/slick-carousel/slick/slick.min.js",
];
*/

const jsLibLocations = [];

// Tasks

const pug = (cb) => {
  src('src/pug/pages/*.pug')
    .pipe(gulpPlumber(notifyOptions))
    .pipe(gulpPug(pugOptions))
    .pipe(dest('build/'))
    .on('end', gulpBrowserSync.reload);
  cb();
};

const stylus = (cb) => {
  src('src/static/stylus/*.styl')
    .pipe(gulpPlumber(notifyOptions))
    .pipe(gulpSourceMaps.init())
    .pipe(gulpStylus(stylusOptions))
    .pipe(gulpAutoPrefixer(autoPrefixerOptions))
    .on(
      'error',
      gulpNotify.onError({
        title: 'Stylus',
      })
    )
    .pipe(gulpCSSO())
    .pipe(gulpSourceMaps.write())
    .pipe(gulpConcat('style.css'))
    .pipe(dest('build/static/css'))
    .pipe(gulpBrowserSync.stream());
  cb();
};

const libsJs = (cb) => {
  if (jsLibLocations && jsLibLocations.length > 0) {
    src(jsLibLocations).pipe(gulpConcat('libs.min.js')).pipe(dest('build/static/js'));
  }
  cb();
};

const ownJs = (cb) => {
  src('src/static/js/**/*.js')
    .pipe(gulpPlumber(notifyOptions))
    .pipe(gulpConcat('script.js'))
    .pipe(dest('build/static/js'))
    .pipe(gulpBrowserSync.stream());

  cb();
};

const compressImg = (cb) => {
  src('src/static/img/**/*.@(png|jpg|jpeg)')
    .pipe(gulpPlumber(notifyOptions))
    .pipe(gulpTinyPng())
    .pipe(dest('build/static/img'));
  cb();
};

const svg = (cb) => {
  src('src/static/img/**/*.svg').pipe(gulpPlumber(notifyOptions)).pipe(dest('build/static/img'));
  cb();
};

const fonts = (cb) => {
  src('src/static/fonts/**/*').pipe(dest('build/static/fonts'));
  cb();
};

const watcher = (cb) => {
  watch('src/pug/**/*.pug', series(pug));
  watch('src/static/stylus/**/*.styl', series(stylus));
  watch('src/static/js/**/*.js', series(ownJs));
  watch('src/static/img/**/*.@(png|jpg|jpeg)', series(compressImg));
  watch('src/static/img/**/*.svg', series(svg));
  watch('src/static/fonts/**/*', series(fonts));
};

const browserSync = (cb) => {
  gulpBrowserSync.init({
    server: {
      baseDir: './build',
    },
  });
};

exports.default = series(
  parallel(pug, stylus, libsJs, ownJs,fonts, compressImg, svg),
  parallel(watcher, browserSync)
);
