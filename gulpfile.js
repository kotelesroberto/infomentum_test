/* Gulp & Gulp dependencies */
var gulp = require('gulp')
var argv = require('yargs').argv
var clean = require('gulp-clean')
var imagemin = require('gulp-imagemin')
var sass = require('gulp-sass')
var watch = require('gulp-watch')
var sequence = require('gulp-sequence')
var babel = require('gulp-babel')
var handlebars = require('gulp-hb')
var rename = require('gulp-rename')
var autoprefixer = require('gulp-autoprefixer')
var sourcemaps = require('gulp-sourcemaps')
var source = require('vinyl-source-stream')
var buffer = require('vinyl-buffer')
var browserify = require('browserify')
var watchify = require('watchify')
var babel = require('babelify')
var through = require('through2')
var gitConfig = require('git-config')
var replace = require('gulp-replace')

/* Other dependencies */
var chalk = require('chalk')
var path = require('path')
var fs = require('fs')

var gitConfigFile = gitConfig.sync()


/* Pretty logs */
var log = function( message, type ) {
	return ( type === 'error' ) ? console.log( chalk.red( message ) ) : console.log( chalk.green( message ) )
}

/* Project name & output directory */
var PROJECT_NAME = 'infomentum'

/* Some globals to help */
var SITE = (argv.site != '' && typeof(argv.site) != "undefined" ? argv.site : "uk")
var SUBFOLDER = (argv.subfolder != '' && typeof(argv.subfolder) != "undefined" ? PROJECT_NAME +"/"+ argv.subfolder : PROJECT_NAME)


/* Configuration */
var config = {

	/* Root directory */
	ROOT_FOLDER: __dirname,

	/* Build output */
	BUILD_FOLDER: path.join( __dirname, '/build/', SITE, SUBFOLDER ),

	/* Content dam assets*/
	ASSETS_FOLDER: path.join( __dirname, '/src/assets/'),

	/* Webfonts */
	FONT_FOLDER: path.join( __dirname, '/src/fonts/webfonts/'),

	/* Development source files */
	SRC_FOLDER: path.join( __dirname, 'src'),

	/* Copy, translations, questions */
	COPY_FOLDER: path.join( __dirname, '/src/copy')
}

// // ==========================================================================
// // Translations
// // ==========================================================================
// var translations = require( './' + config.COPY_FOLDER + '/copy.json' );
// var questions = require( './' + config.COPY_FOLDER + '/questions.json' );

var questions;
var translations;
var questions_Object;
var translations_Object;


/* Gulp delete build folder */
gulp.task('delete-build', function() {

	return gulp.src( config.BUILD_FOLDER, {read: false})
	    .pipe(clean())
	    .on('end', function(){
	    	log("Cleaned build directory")
	    })
})

// Copy assets into build folder
gulp.task('copy-assets', function (cb) {

	return gulp.src([config.ASSETS_FOLDER + '/**/*'])
       			.pipe(gulp.dest(config.ROOT_FOLDER + '/build/assets/')),

        gulp.src([config.FONT_FOLDER + '/**/*'])
       			.pipe(gulp.dest(config.ROOT_FOLDER + '/build/fonts/')),

			  gulp.src([ config.ASSETS_FOLDER + '/favicon/**/*'])
			      .pipe(gulp.dest( config.ROOT_FOLDER + '/build/' ))
		   
	    .on('end', function() {
	    	log("Assets moved")
	   	})
});


/* Gulp compile SCSS as compress/minified */
gulp.task('scss', function() {
  return gulp.src( config.SRC_FOLDER + '/css/**/*.scss' )
    .pipe(sourcemaps.init())
	 	.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
	 		.pipe(autoprefixer({
          browsers: ['last 2 versions'],
          cascade: false
      }))
      .pipe(sourcemaps.write())
    	.pipe(gulp.dest( config.BUILD_FOLDER + '/css/' ))
    	.on('end', function() {
    		log('SCSS Compiled')
    	})
})

/* JavaScript - Babel / Browserify */
function compileJS( watch ) {

	// Read from file and minifying
	var mainJS = fs.readFileSync( config.SRC_FOLDER + "/js/main.js", "utf8");

	var questionData = [];

	var bundler = watchify(
		browserify( config.SRC_FOLDER + '/js/main.js', { debug: true } ).transform( babel.configure({ presets: ['es2015-ie'], plugins: ['transform-html-import-to-string'] } ))
	)
	//.transform('uglifyify', { global: true  })

	
	function rebundle() {
		bundler.bundle()
			.on('error', function(err) { console.error(err); this.emit('end'); })
			.pipe(source('main.js'))
			.pipe(replace('[[QUESTIONDATA]]', JSON.stringify(questions_Object) ))
			.pipe(buffer())
			.pipe(sourcemaps.init({ loadMaps: true }))
			.pipe(sourcemaps.write('./'))
			.pipe(gulp.dest( config.BUILD_FOLDER + '/js/' ))
	}

	rebundle();


	//
	// For watch
	// --------------------------------------------------------------------------
	if ( watch ) {
		bundler.on('update', function() {
			log('Rebundling JavaScript')
			rebundle()
		})
	}

}

function watchJS() {
	return compileJS( true )
}

gulp.task('buildJS', function() { return compileJS() })
gulp.task('watchJS', function() { return watchJS() })

/* Read JSON */
gulp.task('readJSON', function () {

	questions = path.join( config.SRC_FOLDER + '/copy/questions.json' )
	translations = path.join( config.SRC_FOLDER + '/copy/copy.json' )

	questions_Object = JSON.parse(fs.readFileSync(questions, 'utf8'))
	translations_Object= JSON.parse(fs.readFileSync(translations, 'utf8'))

	log(JSON.stringify(translations_Object))

	return true;

})

/* Watch /src directory for changes & reload gulp */
gulp.task('html', function () {

	// questions = path.join( config.SRC_FOLDER + '/copy/questions.json' )
	// translations = path.join( config.SRC_FOLDER + '/copy/copy.json' )

	// questions_Object = JSON.parse(fs.readFileSync(questions, 'utf8'))
	// translations_Object= JSON.parse(fs.readFileSync(translations, 'utf8'))

	// var data = Object.assign(translations_Object)
	var data = translations_Object;

	log(JSON.stringify(translations_Object))

	return gulp.src(translations )
		.pipe(through.obj(function (file, enc, cb) {
			/* Data as JSON from Copy Doc */
			gulp.src( config.SRC_FOLDER + '/*.{html,hbs}' )
				.pipe(handlebars({
						helpers: config.SRC_FOLDER + '/templates/helpers/handlebarsHelpers.js',
						partials: config.SRC_FOLDER + '/templates/partials/*.{html,hbs}',
						bustCache: true,
						data: {
							'dtgen': new Date(),
							'site': SITE,
							'subfolder': SUBFOLDER,
							'epoch': (new Date).getTime(),
							'author': 'Robert Koteles',
							'translations': translations_Object,
							'questions': questions_Object
						}
					})
				)
				.pipe(gulp.dest( config.BUILD_FOLDER ))
				.on('error', function(err) { log('Error building HTML templates', 'error') })
				.on('end', function(err) { log('Compiled HTML templates') })

		}))

})

/* Watch /src directory for changes & reload gulp */
gulp.task('watch', function () {
	gulp.watch( config.SRC_FOLDER + '/css/**/*.scss', ['scss'] )
	gulp.watch( config.SRC_FOLDER + '/js/**/*.js', ['watchJS'] )
	gulp.watch( config.SRC_FOLDER + '/templates/**/*.html', ['html'] )
	gulp.watch( config.SRC_FOLDER + '/templates/**/*.hbs', ['html'] )
	log('Watching src for changes... ')
})


gulp.task('default', ['delete-build', 'copy-assets', 'scss', 'readJSON', 'buildJS', 'html', 'watch'])
gulp.task('build', sequence('delete-build', 'copy-assets', 'scss', 'readJSON', 'buildJS', 'html') )
gulp.task('dev', sequence('delete-build', 'copy-assets', 'scss', 'readJSON', 'buildJS', 'html') )
