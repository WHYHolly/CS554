const gulp = require("gulp");
const concatenate = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const autoPrefix = require("gulp-autoprefixer");
const gulpSASS = require("gulp-sass");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
//var reload      = BrowserSync.reload;

//"./src/styles/bootstrap/scss/_variables.scss"

// const sassFiles = [
//   "./src/styles/variables.scss",
//   "./src/styles/custom.scss",
//   "./src/styles/bootstrap/scss/_variables.scss"
// ];

// const vendorJsFiles = [
//   "./node_modules/jquery/dist/jquery.js",
//   "./node_modules/popper.js/dist/umd/popper.min.js",
//   "./node_modules/bootstrap/dist/js/bootstrap.js"
// ];
const sassFiles = [
  "./node_modules/tether/dist/css/tether.css",
  "./src/styles/variables.scss",
  "./src/styles/custom.scss"
];

const vendorJsFiles = [
  "./node_modules/jquery/dist/jquery.min.js",
  "./node_modules/tether/dist/js/tether.min.js",
  "./node_modules/bootstrap/dist/js/bootstrap.min.js"
];

gulp.task('sass', function(done) {
  gulp.src(sassFiles)
      .pipe(gulpSASS())
      .pipe(concatenate("styles.css"))
      .pipe(gulp.dest("./public/css/"))
      .pipe(
        autoPrefix({
          overrideBrowserslist: ["last 2 versions"],
          cascade: false
        })
      )
      .pipe(cleanCSS())
      .pipe(rename("styles.min.css"))
      .pipe(gulp.dest("./public/css/"))
      // .pipe(browserSync.reload({
      //   stream: true
      // }));
  done();
});

gulp.task('js:vendor', function(done) {
    gulp
    .src(vendorJsFiles)
    .pipe(concatenate("vendor.min.js"))
    .pipe(gulp.dest("./public/js/"))
    // .pipe(browserSync.reload({
    //   stream: true
    // }))
    done();
});

gulp.task("build", gulp.parallel(["sass","js:vendor"]));


gulp.task('watch', function(done) {
    // browserSync.init({
    //   server: {
    //     baseDir: 'public'
    //   },
    // })
    gulp.watch(sassFiles, gulp.series('sass'));
    gulp.watch(vendorJsFiles, gulp.series('js:vendor'));
    
    done();
});

gulp.task('default', gulp.series('watch'));
