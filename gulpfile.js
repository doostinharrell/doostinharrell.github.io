// Require Node Modules
var gulp          = require('gulp'),
    browsersync   = require('browser-sync'),
    filter        = require('gulp-filter'),
    uglify        = require('gulp-uglify'),
    concat        = require('gulp-concat'),
    flatten       = require('gulp-flatten'),
    ext           = require('gulp-ext-replace'),
    nodesass      = require('node-sass'),
    sass          = require('gulp-sass'),
    globbing      = require('gulp-css-globbing'),
    minifycss     = require('gulp-minify-css'),
    sourcemaps    = require('gulp-sourcemaps'),
    bowerfiles    = require('main-bower-files'),
    browsersync   = require('browser-sync'),
    reload        = browsersync.reload;

// Bower Task
gulp.task('bower-build', function() {
  
  gulp.src(bowerfiles({ // Get main js files
    includeDev:'true',
    overrides: {
      "modernizr-min": {
        main: "*.js" // Manual main file definition for modernizr
      }
    }
  }),{base:'bower_components'})

    .pipe(filter('**/*.js'))
    .pipe(flatten())
    .pipe(gulp.dest('dev/js/bower'))

  gulp.src(bowerfiles({includeDev:'true'}),{base:'bower_components'})// get main css files
    .pipe(filter('**/*.css'))
    .pipe(ext('.scss'))
    .pipe(flatten())
    .pipe(gulp.dest('dev/sass/bower'))
})

// JS Task
gulp.task('js', function() {
  gulp.src('dev/js/*.js')
    .pipe(uglify())
    .pipe(concat({ path: 'functions.js', stat: {mode: 0666} }))
    .pipe(gulp.dest('build/js'))
})

// Sass Task
gulp.task('sass', function() {
  gulp.src('dev/sass/styles.scss')
    .pipe(sourcemaps.init())
    .pipe(globbing({ extensions: ['.scss'] }))
    .pipe(sass())
    .pipe(minifycss())
    .pipe(sourcemaps.write('../maps/css'))
    .pipe(gulp.dest('build/css'))
})

// Watch for changes
gulp.task('watch', function(){
  gulp.watch('dev/**/*', ['js', 'sass'])
})

// Run run browser-sync and watch for changes
gulp.task('default', ['watch'])