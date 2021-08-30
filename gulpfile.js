var gulp = require('gulp');
var sass = require('gulp-sass');
sass.compiler = require('node-sass');
var sourcemaps = require('gulp-sourcemaps');
var plumber = require('gulp-plumber');
var concat = require('gulp-concat');
var babel = require('gulp-babel');
//var browserSync = require('browser-sync').create();
var access = require('gulp-accessibility');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var open = require('gulp-open');

gulp.task('sass', function() {
    gulp.src(['./sass/*.scss'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: 'expanded',sourceMap: true,errLogToConsole: true}).on('error', sass.logError))       
        .pipe(autoprefixer({
            browsers: ["last 50 versions", "safari >= 7", "ie >= 9"]
        }))
        .pipe(sourcemaps.write('/maps'))
        .pipe(gulp.dest('./dist/css'))
        //.pipe(browserSync.stream());
});  

gulp.task('scripts', function() {
    gulp.src(['./js/*.js'])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))       
        .pipe(babel({
            presets: ['@babel/env','minify']
        }))
        .pipe(sourcemaps.write('./js/maps'))
        .pipe(gulp.dest('./dist/js'))
        //.pipe(browserSync.stream());
});

gulp.task('html-access', function() {
    gulp.src(['./*.html'])
        .pipe(plumber())        
        .pipe(access({
            force: true
          }))
        .on('error', console.log)
        .pipe(access.report({reportType: 'txt'}))
        .pipe(rename({
            extname: '.txt'
        }))
        .pipe(gulp.dest('./reports/txt'))
        //.pipe(browserSync.stream());
}); 

gulp.task('open', function(){
    gulp.src('')
    .pipe(open({ uri: 'http://localhost:8080'}));
  });
  


gulp.task('default', function () {   
    // browserSync.init({        
    //     server: "./"
    // });
    gulp.watch('./sass/**/*.scss',['sass']);
    gulp.watch('./js/*.js',['scripts']);
    gulp.watch('*.html',['html-access']);

    livereload.listen();

    gulp.watch(['*.html', 'dist/js/*.js', 'dist/css/*.css']).on('change', livereload.changed);


    connect.server({
        root: './',
        // host: '',
        keepalive: false,
        livereload: true
      });
});

