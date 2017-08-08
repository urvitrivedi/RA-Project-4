var gulp = require("gulp");
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var uglify = require('gulp-uglify');
var gutil = require("gulp-util");
var notify = require('gulp-notify');
var source = require("vinyl-source-stream");
var buffer = require('vinyl-buffer');
var browserify = require("browserify");
var watchify = require("watchify");
var babelify = require("babelify");

var browserSync = require("browser-sync").create();


// SCSS - concat,uglify
gulp.task('scss', function() {
	return gulp.src('./src/scss/**/*.scss')
     .pipe(sass())
  	.pipe(concat('style.css'))
  	.pipe(uglifycss())
  	.pipe(gulp.dest('./build/css/'));
});


//JS - concat, ugilify
gulp.task('unify-js', function() {
    gulp.src('./src/js/**/*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js/'));
});






var ENTRY_FILE = "./src/js/index.js";
var OUTPUT_DIR = "./build/js";
var OUTPUT_FILE = "bundle.js";
var DELAY = 50;

gulp.task("watch", function () {
    var b = browserify({ entries: [ ENTRY_FILE ] }).transform(babelify);

    function bundle() {
        b.bundle()
        .on("log", gutil.log)
        .on("error", notify.onError())
        .pipe(source(OUTPUT_FILE))
        .pipe(buffer())
        .pipe(gulp.dest(OUTPUT_DIR))
        .pipe(browserSync.reload({ stream: true }));
    }

    watchify(b, { delay: DELAY }).on("update", bundle);
    bundle();
});

gulp.task("serve", function () {
    browserSync.init({
        server: {
            baseDir: "./build"
        }
    });
});

gulp.task("default", [ "watch", "serve" ]);