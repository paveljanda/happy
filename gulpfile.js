/**
 * Gulp libraries
 */
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var coffee       = require('gulp-coffee');
var uglify       = require('gulp-uglify');
var minify_css   = require('gulp-minify-css');
var rename       = require('gulp-rename');
var concat       = require('gulp-concat');
var concat_css   = require('gulp-concat-css');
var browser_sync = require('browser-sync');
var reload       = browser_sync.reload;



/**
 * Paths to preprocessed files
 */
var PATHS = {
	styles           : 'src/sass/happy.scss',
	styles_all       : 'src/sass/**/*.scss',
	scripts          : 'src/coffee/**/*.coffee',
	styles_compiled  : 'dist',
	scripts_compiled : 'dist'
};


/**
 * Sync all styles and scripts
 */
gulp.task('browser-sync', function() {
	browser_sync({
		notify: false,
		debugInfo: false,
		proxy: "happy.dev",
		port: 9000,
		open: false
	});
});


/**
 * Sass:
 * 	- process
 * 	- concat
 * 	- minify
 */
gulp.task('sass', function() {
	return gulp.src(PATHS.styles)
		.pipe(sass({sourcemap: true}))
		.pipe(concat_css('happy.css'))
		//.pipe(minify_css({keepBreaks:true}))
		.pipe(gulp.dest(PATHS.styles_compiled))
		.pipe(reload({stream:true}));
});

gulp.task('css-min', function() {
	return gulp.src(PATHS.styles)
		.pipe(sass({sourcemap: true}))
		.pipe(concat_css('happy.min.css'))
		.pipe(minify_css({keepBreaks:true}))
		.pipe(gulp.dest(PATHS.styles_compiled))
		.pipe(reload({stream:true}));
});

/**
 * Coffeescript:
 * 	- compile
 * 	- concat
 * 	- uglify
 */
gulp.task('coffee', function() {
	return gulp.src(PATHS.scripts)
		.pipe(coffee({bare: true}))
		.pipe(concat('happy.js'))
		//.pipe(uglify())
		.pipe(gulp.dest(PATHS.scripts_compiled))
		.pipe(reload({stream:true}));
});

gulp.task('js-min', function() {
	return gulp.src(PATHS.scripts)
		.pipe(coffee({bare: true}))
		.pipe(concat('happy.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(PATHS.scripts_compiled))
		.pipe(reload({stream:true}));
});

/**
 * Set default task and initiate watches
 */
gulp.task('default', ['sass', 'coffee', 'browser-sync'], function () {
	gulp.watch(PATHS.scripts, ['coffee', reload]);
	gulp.watch(PATHS.styles_all, ['sass']);
});

/**
 * Minify JS/CSS
 */
gulp.task('min', ['js-min', 'css-min']);
