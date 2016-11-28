"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var precss = require("precss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

var rename = require("gulp-rename");
var run = require("run-sequence");
var del = require("del");
var mqpacker = require("css-mqpacker");
var minify = require("gulp-csso");
var imagemin = require("gulp-imagemin");

gulp.task("style", function() {
  gulp.src("postcss/style.css")
    .pipe(plumber())
    .pipe(postcss([
      precss(),
      autoprefixer({browsers: [
        "last 1 version",
        "last 2 Chrome versions",
        "last 2 Firefox versions",
        "last 2 Opera versions",
        "last 2 Edge versions"
      ]})
    ]))
    .pipe(gulp.dest("docs/css"))
    .pipe(minify())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("docs/css"))
    .pipe(server.stream());
});

gulp.task("serve", ["style"], function() {
  server.init({
    server: ".",
    notify: false,
    open: true,
    ui: false
  });

  gulp.watch("postcss/**/*.css", ["style"]);
  gulp.watch("*.html", ["copy:html"]);
  gulp.watch("docs/*.html").on("change", server.reload);
});

gulp.task("images", function() {
  return gulp.src("docs/img/**/*.{png,jpg,gif}")
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true})
    ]))
    .pipe(gulp.dest("docs/img"));
});

gulp.task("copy", function() {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**",
    "*.html",
    "slick/**"
  ], {
    base: "."
  })
  .pipe(gulp.dest("docs"));
});

gulp.task("docs", function(fn) {
  run(
    "clean",
    "copy",
    "style",
    "images",
    fn
  );
});

gulp.task("clean", function() {
  return del("docs");
});

gulp.task("copy:html", function() {
  return gulp.src([
    "*.html"
  ], {
    base: "."
  })
  .pipe(gulp.dest("docs"));
});
