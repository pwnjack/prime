'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var mainBowerFiles = require('main-bower-files');
var del = require('del');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('styles', function() {
	return gulp.src(['app/styles/*.less', '!variables.less'])
	.pipe($.order([
		"fontface.less",
		"style.less",
		"responsive.less"
	]))
    .pipe($.less())
    .pipe($.autoprefixer('last 5 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
    .pipe($.concatCss('main.css'))
    .pipe(gulp.dest('app/.tmp'))
	.pipe(reload({stream:true}));
});

gulp.task('scripts', function() {
	return gulp.src('app/scripts/*.js')
	.pipe($.order([
		"plugins.js",
		"main.js"
	]))
	.pipe($.jshint())
	.pipe($.jshint.reporter('jshint-stylish'))
	.pipe($.concat('main.js'))
	.pipe(gulp.dest('app/.tmp'))
});

gulp.task('clear_cache', function (done) {
    return $.cache.clearAll(done);
});

gulp.task('images', ['clear_cache'], function() {
	return gulp.src('app/images/*')
	.pipe($.cache($.imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true
    })))
	.pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
	return gulp.src(['app/**/fonts/*.eot', 'app/**/fonts/*.woff', 'app/**/fonts/*.svg', 'app/**/fonts/*.ttf'])
	.pipe($.flatten())
	.pipe(gulp.dest('dist/fonts'))
});

gulp.task('extra', function() {
	return gulp.src(['app/**/*.*', '!app/*.html', '!app/bower_components/**', '!app/scripts/**', '!app/styles/**', '!app/images/**', '!app/.tmp/**', '!app/.tmp'], { dot: true })
	.pipe(gulp.dest('dist'))
});

gulp.task('inject', function () {
    return gulp.src('app/*.html')
    .pipe($.inject(gulp.src(mainBowerFiles(), {read: false}), {name: 'bower', relative: true}))
    .pipe($.inject(gulp.src('app/bower_components/**/modernizr.js', {read: false}), {name: 'modernizr', relative: true}))
    .pipe(gulp.dest('app'));
});

gulp.task('start', function() {
    gulp.start('styles', 'scripts', 'inject');
});

gulp.task('clean', function(cb) {
    del(['dist', 'app/.tmp'], cb)
});

gulp.task('deploy', ['inject'], function () {
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

gulp.task('build', ['start'], function() {
    gulp.start('deploy', 'images', 'fonts', 'extra');
});

gulp.task('watch', function() {
	gulp.watch('app/styles/**/*.less', ['styles']);
	gulp.watch('app/scripts/**/*.js', ['scripts']);
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