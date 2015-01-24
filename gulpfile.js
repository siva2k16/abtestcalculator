// var jshint = require('gulp-jshint');
var gulp = require( 'gulp' ),
	browserify = require( 'browserify' ),
	reactify = require( 'reactify' ),
	rename = require( 'gulp-rename' ),
	sass = require( 'gulp-sass' ),
	source = require( 'vinyl-source-stream' ),
	streamify = require( 'gulp-streamify' )
	uglify = require( 'gulp-uglify' );

var config = {
	sassPath: './stylesheets/scss',
	jsPath: './js',
	buildPath: './build'
};

gulp.task( 'default', [ 'watch', 'css', 'js' ] );

gulp.task( 'watch', function() {
	gulp.watch( config.sassPath + '/*.scss', [ 'css' ] );
	gulp.watch( config.jsPath + '/**/*.js', [ 'js' ] );
	gulp.watch( config.jsPath + '/**/*.jsx', [ 'js' ] );
} );

gulp.task( 'css', function () {
	gulp.src( config.sassPath + '/*.scss' )
		.pipe( sass() )
		.pipe( gulp.dest( './stylesheets/compiled' ) );
});

gulp.task( 'js', function() {
	var mainPath = config.jsPath + '/main.js';

	browserify({
		entries: mainPath,
		extensions: [ '.jsx' ]
	} )
		.transform( reactify )
		.bundle()
		.pipe( source( mainPath ) )
		.pipe( rename( 'bundle.js' ) )
		.pipe( gulp.dest( config.buildPath + '/js' ) )

		// Add after bundle.js line for production
		// .pipe( streamify( uglify() ) )
} );