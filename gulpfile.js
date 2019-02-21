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

var config = {
  // JS_SOURCE_FILE: "./source/js/main.js",
  // JS_SOURCES: ["./partials/**/*.js", "./source/js/**/*.js"],
  // JS_OUT_DIR: "./dist/js/",
  // JS_OPTIONS: {
  //   uglify: {
  //     mangle: false
  //   }
  // },
  SASS_SOURCE_FILE: "./global/main.sass",
  SASS_SOURCES: ["./global/*.{sass,scss}", "./components/**/*.{sass,scss}"],
  SASS_OUT_DIR: "./dist/css/"
};

var entry = { main: config.JS_SOURCE_FILE };

var webpackConfig = {
  entry: entry,
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

// gulp.task("compile-js", function() {
//   return gulp
//     .src(config.JS_SOURCES)
//     .pipe(webpackStream(webpackProdConfig, webpack))
//     .pipe(gulp.dest(config.JS_OUT_DIR));
// });

// gulp.task("watch-js", () => {
//   webpackConfig.watch = true;

//   gulp
//     .src(config.JS_SOURCES)
//     .pipe(webpackStream(webpackConfig, webpack))
//     .pipe(gulp.dest(config.JS_OUT_DIR));
// });

gulp.task("compile-sass", function() {
  gulp
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
});

gulp.task("watch-sass", function() {
  gulp.watch(config.SASS_SOURCES, ["compile-sass"]);
});

gulp.task("compile-ts", ["clear-old-ts", "build-new-ts"]);

gulp.task("clear-old-ts", function() {
  exec("rm -rf ./tmp/**/*.js");
});

gulp.task("build-new-ts", function() {
  exec("tsc -p ./");
});

// gulp.task("build", ["compile-js", "compile-sass"]);
// gulp.task("grow-build", ["compile-js", "compile-sass"]);
// gulp.task("default", ["watch-js", "compile-sass", "watch-sass"]);

gulp.task("build", ["compile-sass"]);
gulp.task("grow-build", ["compile-sass"]);
gulp.task("default", ["compile-sass", "watch-sass"]);
