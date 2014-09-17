var gameName = 'Flying Rabbit HD';


var gulp = require('gulp');
var rjs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var htmlreplace = require('gulp-html-replace');
var rename = require('gulp-rename');

var paths = {
	scripts: ['src/*.js','js/*.min.js'],
	assets: ['./audio/*','./css/*','./fonts/*','./icons/*','./images/*']
};

build = './build/';
templateSource = 'index.tpl';
templateTarget = 'index.html';

var rjsBase = 'src/';
var almondjs = 'js/almond.js';
var almondInclude = 'Game';
var rjsShim = {
	'Game': ['Boot']
};


// Copy index template
gulp.task('replaceTitle', function() {
	gulp.src(templateSource)
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

// Copy audi
gulp.task('copyAssets', function() { gulp.src(paths.assets, { base: './' }).pipe(gulp.dest(build)); });


gulp.task('default', ['replaceTitle', 'copyAssets']);
