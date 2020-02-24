
const gulp          = require('gulp'),
      sass          = require('gulp-sass'),
      autoprefixer  = require('gulp-autoprefixer'),
      plumber       = require('gulp-plumber'),
      jade          = require('gulp-jade'),
      cssnano       = require('gulp-cssnano'),
      browserSync   = require('browser-sync'),
      cache         = require('gulp-cache'),
      changed       = require('gulp-changed'),
      concat        = require('gulp-concat'),
      imageMin      = require('gulp-imagemin'),
      notify        = require('gulp-notify'),
      jsUglify      = require('gulp-uglify'),
      clean         = require('gulp-clean'),
      fileinclude   = require('gulp-file-include'),
      newer         = require('gulp-newer'),
      watch         = require('gulp-watch'),
      runSequence   = require('run-sequence');



// Call compilation HTML

gulp.task('jade', async function(){
    return gulp.src('app/jade/*.jade')
    .pipe(changed('app/jade/*.jade'))
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(jade())
    .pipe(gulp.dest('app'))
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.reload({stream: true}));
});

// Call compilation scss to css
gulp.task('sass', async function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(changed('app/scss/**/*.scss'))
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    .pipe(sass())
    // .pipe(cssnano())
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream: true}));
});

// Css libs compilation to libs.min.css in app/css
gulp.task('css-libs', async function(){
    return gulp.src('app/libs/**/*.css')
    .pipe(changed('app/libs/**/*.css'))
    // .pipe(cssnano())
    .pipe(concat('libs.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({stream: true}));
});

// Call compilation JS
gulp.task('js-libs', async function(){
    return gulp.src('app/libs/**/*.js')
    .pipe(changed('app/libs/**/*.js'))
    .pipe(concat('libs.min.js'))
    // .pipe(jsUglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('js', async function(){
    return gulp.src('app/js/*.js')
    .pipe(changed('app/js/*.js'))
    // .pipe(jsUglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.reload({stream: true}));
});

//Build image to folder dist/img
gulp.task('img', () => {
  return gulp.src('app/img/**/*')
      .pipe(changed('app/img/**/*.*'))
      .pipe(cache(imageMin({
        // .pipe(imageMin({ // Compress without cashing
        interlaced: true,
        progressive: true,
        svgoPlugins: [{removeViewBox: false}],
      })))
      .pipe(gulp.dest('dist/img'))
});

//Build Fonts to folder dist/fonts
gulp.task('fonts', async function() {
    return gulp.src('app/fonts/*/**')
    .pipe(changed('app/fonts/*/**'))
     .pipe(gulp.dest('dist/fonts'))
      .pipe(browserSync.reload({stream: true}));
});

//Перезагрузка страницы и создание сервера
gulp.task('browser-sync', async function() {
  browserSync.init({
    server: {
      baseDir: './dist'
    },
    //files: ([
     // 'dist/css/index.css',
      //'dist/js/index.js',
    //  'dist/*.html',
    //]),
    notify: false,
    //tunnel: true,
    host: 'localhost',
    port: 8081,
    logPrefix: "Zubrin"
  })
})

//Clean
gulp.task('clean', async function(){
    return gulp.src('dist', {read: false})
    .pipe(clean());
});

gulp.task('cleanImg', async function () {
    return gulp.src('dist/img', {read: false})
    .pipe(clean());
});

gulp.task('build', gulp.series('jade', 'sass', 'css-libs', 'js-libs', 'js', 'img', 'fonts'));


gulp.task('watch',  async function(){
  gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('app/jade/**/*.jade', gulp.series('jade'));
  gulp.watch('app/libs/**/*.css', gulp.series('css-libs'));
  gulp.watch('app/libs/**/*.js', gulp.series('js-libs'));
  gulp.watch('app/js/*.js', gulp.series('js'));
  gulp.watch('app/img/**/*.*', gulp.series('img'));
  gulp.watch('app/fonts/**/*.*', gulp.series('fonts'));
  gulp.watch('app/*.html');
});

gulp.task('clear', function(callback) {
  return cache.clearAll();
});


gulp.task('default', gulp.series('browser-sync', 'sass', 'jade', 'js', 'css-libs', 'js-libs', 'fonts', 'img', 'watch'));
