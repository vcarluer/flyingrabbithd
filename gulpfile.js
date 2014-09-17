var gameName = 'Flying Rabbit HD';

var gulp = require('gulp');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var htmlreplace = require('gulp-html-replace');
var rename = require('gulp-rename');
var zip = require('gulp-zip');
var runSequence = require('run-sequence');

var paths = {
	assets: ['./audio/**/*','./css/**/*','./fonts/**/*','./icons/**/*','./images/**/*']			

};

build = './build/';
releaseDir = './release/';
releaseFile = gameName + '.zip';

templateSource = 'index.tpl';
templateTarget = 'index.html';

var rjsBase = 'src/';
var almondjs = '../js/almond';
var almondInclude = 'Main';
var rjsShim = {
	'Main': ['../js/phaser.min.js','Boot','CheckOrientation','Preloader','GamersAssociate','MainMenu','Game'],
	'Game': ['Ground','Pipe','PipeGroup','Rabbit','Scoreboard']
};


// Copy index template
gulp.task('replaceTitle', function() {
	return gulp.src(templateSource)
	.pipe(htmlreplace(
		{
			'title': {
				src: gameName,
				tpl: '<title>%s</title>'
			}
		}))
	.pipe(rename(templateTarget))
	.pipe(gulp.dest(build));	
});

// Copy assets
gulp.task('copyAssets', function() { return gulp.src(paths.assets, { base: './' }).pipe(gulp.dest(build)); });

// RequireJs and uglify
gulp.task('rjsBuild', function(callback) {
	rjs({
		baseUrl: rjsBase,
		out: 'game.js',
		name: almondjs,
		optimize: 'uglify',
		include: almondInclude,
		shim: rjsShim
	})
	.pipe(uglify())
	.pipe(gulp.dest(build+'js/'));
	callback();
});

// Zip
gulp.task('zipRelease', function() {
	return gulp.src(build+"**/*")
	.pipe(zip(releaseFile))
	.pipe(gulp.dest(releaseDir));
});

gulp.task('default', function(callback) {
	runSequence(['replaceTitle','copyAssets'],'rjsBuild','zipRelease',callback);
});
