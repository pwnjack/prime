'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var gFilter = require('gulp-filter');
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function() {
	return gulp.src('app/styles/*.less')
    .pipe($.less())
    .pipe($.autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe($.concatCss('main.css'))
    .pipe(gulp.dest('app/.tmp'))
	.pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
	return gulp.src('app/scripts/*.js')
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish'))
	.pipe($.concat('main.js'))
	.pipe(gulp.dest('app/.tmp'))
});

gulp.task('images', function() {
	return gulp.src('app/images/*')
	.pipe($.cache($.imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
	.pipe(gulp.dest('dist/images'))
});

gulp.task('assets', function () {
	var jsFilter = gFilter('**/*.js');
    var cssFilter = gFilter('**/*.css');
    var fontFilter = gFilter(['*.eot', '*.woff', '*.svg', '*.ttf']);
    return gulp.src(mainBowerFiles())
	.pipe(jsFilter)
	.pipe(gulp.dest('app/assets/js'))
    .pipe(jsFilter.restore())
    .pipe(cssFilter)
    .pipe(gulp.dest('app/assets/css'))
    .pipe(cssFilter.restore())
	.pipe(fontFilter)
	.pipe(gulp.dest('app/assets/fonts'))
	.pipe(fontFilter.restore())
});

gulp.task('fonts', function() {
	return gulp.src(['app/**/*.eot', 'app/**/*.woff', 'app/**/*.svg', 'app/**/*.ttf'])
	.pipe($.flatten())
	.pipe(gulp.dest('dist/fonts'))
});

gulp.task('inject', ['assets'], function () {
	return gulp.src('app/*.html')
	.pipe($.inject(gulp.src('app/assets/**/*.*'), {relative: true}))
	.pipe(gulp.dest('app'));
});

gulp.task('start', function() {
    gulp.start('styles', 'scripts', 'inject');
});

gulp.task('clean', function(cb) {
    del(['dist', 'app/.tmp', 'app/assets'], cb)
});

gulp.task('deploy', function () {
	var gulpif = require('gulp-if');
    var assets = $.useref.assets();
    return gulp.src('app/*.html')
    .pipe(assets)
    .pipe(gulpif('*.js', $.uglify()))
    .pipe(gulpif('*.css', $.csso()))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['assets', 'start'], function() {
    gulp.start('deploy', 'images', 'fonts');
});

gulp.task('watch', function() {
	gulp.watch('app/styles/**/*.less', ['styles']);
	gulp.watch('app/scripts/**/*.js', ['scripts']);
	gulp.watch('app/images/**/*', ['images']);
});

gulp.task('serve', ['watch'], function() {
	browserSync({
	server: {
	  baseDir: 'app'
	}
	});
	gulp.watch(['*.html', '.tmp/*.css', '.tmp/*.js'], {cwd: 'app'}, reload);
});

gulp.task('default', ['clean'], function() {
	gulp.start('start', 'serve');
});