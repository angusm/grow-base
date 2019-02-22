var extend = require("deep-extend");
var fs = require("fs");
var gulp = require("gulp");
var gulpAutoprefixer = require("gulp-autoprefixer");
var path = require("path");
var readdirRecursive = require("fs-readdir-recursive");
var rename = require("gulp-rename");
var sass = require("gulp-sass");
var webpack = require("webpack");
var webpackStream = require("webpack-stream");
var exec = require('gulp-exec');

var config = {
  TS_SOURCES: ["./global/*.ts", "./components/**/*.ts"],
  JS_SOURCE_FILE: "./tmp/js/global/main.js",
  JS_SOURCES: ["./tmp/js/**/*.js"],
  JS_OUT_DIR: "./dist/js/",
  JS_OPTIONS: {
    uglify: {
      mangle: false
    }
  },
  SASS_SOURCE_FILE: "./global/main.sass",
  SASS_SOURCES: ["./global/*.{sass,scss}", "./components/**/*.{sass,scss}"],
  SASS_OUT_DIR: "./dist/css/"
};

var webpackConfig = {
  entry: { main: config.JS_SOURCE_FILE },
  mode: "development",
  output: {
    path: path.resolve(__dirname, config.JS_OUT_DIR),
    filename: "[name].min.js"
  }
};

var webpackProdConfig = extend(
  {
    mode: "production"
  },
  webpackConfig
);

const compileJs = () => {
  return gulp
      .src(config.JS_SOURCES)
      .pipe(webpackStream(webpackProdConfig, webpack))
      .pipe(gulp.dest(config.JS_OUT_DIR));
};
gulp.task("compile-js", compileJs);

const compileSass = () => {
  return gulp
    .src(config.SASS_SOURCE_FILE)
    .pipe(
      sass({
        outputStyle: "compressed"
      })
    )
    .on("error", sass.logError)
    .pipe(
      rename(function(path) {
        path.basename += ".min";
      })
    )
    .pipe(
      gulpAutoprefixer({
        browsers: ["last 1 version", "last 2 iOS versions"]
      })
    )
    .pipe(gulp.dest(config.SASS_OUT_DIR));
};
gulp.task("compile-sass", compileSass);

const watchSass = () => gulp.watch(config.SASS_SOURCES, ["compile-sass"]);
gulp.task("watch-sass", watchSass);

const clearOldTs = (done) =>{
  exec("rm -rf ./tmp/js/*");
  done();
};
gulp.task("clear-old-ts", clearOldTs);

const buildNewTs = (done) => {
  gulp.src('./tsconfig.json')
      .pipe(exec('tsc -p <%= file.path %>'));
  done();
};
gulp.task("build-new-ts", buildNewTs);

const compileTs = gulp.series(clearOldTs, buildNewTs, compileJs, clearOldTs);
gulp.task("compile-ts", compileTs);

gulp.task("build", gulp.parallel(compileSass, compileTs));
gulp.task("grow-build", gulp.parallel(compileSass));
gulp.task("default", gulp.parallel(compileSass, watchSass));
