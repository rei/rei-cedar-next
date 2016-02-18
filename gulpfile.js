'use strict';

//      /$$$$$$$                                /$$
//     | $$__  $$                              |__/
//     | $$  \ $$  /$$$$$$   /$$$$$$  /$$   /$$ /$$  /$$$$$$   /$$$$$$   /$$$$$$$
//     | $$$$$$$/ /$$__  $$ /$$__  $$| $$  | $$| $$ /$$__  $$ /$$__  $$ /$$_____/
//     | $$__  $$| $$$$$$$$| $$  \ $$| $$  | $$| $$| $$  \__/| $$$$$$$$|  $$$$$$
//     | $$  \ $$| $$_____/| $$  | $$| $$  | $$| $$| $$      | $$_____/ \____  $$
//     | $$  | $$|  $$$$$$$|  $$$$$$$|  $$$$$$/| $$| $$      |  $$$$$$$ /$$$$$$$/
//     |__/  |__/ \_______/ \____  $$ \______/ |__/|__/       \_______/|_______/
//                               | $$
//                               | $$
//                               |__/




/**
 * Build script for the REI Cedar Framework
 */

var path                = require( 'path' );
var gulp                = require( 'gulp' );
var less                = require( 'gulp-less' );
var rename              = require( 'gulp-rename' );
var minifyCss           = require( 'gulp-cssnano' );
var a11y                = require( 'gulp-a11y' );
var pa11y               = require( 'gulp-pa11y' );
var csscomb             = require( 'gulp-csscomb' );
var inject              = require( 'gulp-inject' );
var uglify              = require( 'gulp-uglify' );
var streamify           = require( 'gulp-streamify' );
var cssmin              = require( 'gulp-cssmin' );
var csslint             = require( 'gulp-csslint' );
var qunit               = require( 'gulp-qunit' );
var sourcemaps          = require( 'gulp-sourcemaps' );
var cssLintLessReporter = require( 'gulp-csslint-less-reporter' );
var postcss             = require( 'gulp-postcss' );

var autoprefixer        = require( 'autoprefixer' );
var source              = require( 'vinyl-source-stream' );
var browserify          = require( 'browserify' );
var glob                = require( 'glob' );
var del                 = require( 'del' );
var es                  = require( 'event-stream' );
var runSequence         = require( 'run-sequence' );

var pkg                 = require( './package.json' );



//       /$$$$$$                       /$$$$$$  /$$
//      /$$__  $$                     /$$__  $$|__/
//     | $$  \__/  /$$$$$$  /$$$$$$$ | $$  \__/ /$$  /$$$$$$
//     | $$       /$$__  $$| $$__  $$| $$$$    | $$ /$$__  $$
//     | $$      | $$  \ $$| $$  \ $$| $$_/    | $$| $$  \ $$
//     | $$    $$| $$  | $$| $$  | $$| $$      | $$| $$  | $$
//     |  $$$$$$/|  $$$$$$/| $$  | $$| $$      | $$|  $$$$$$$
//      \______/  \______/ |__/  |__/|__/      |__/ \____  $$
//                                                  /$$  \ $$
//                                                 |  $$$$$$/
//                                                  \______/




/**
 * Define directory paths
 */

var PATHS = {
    /**
     * DIST: REI-Cedar Root
     *
     * NOTE: This is the root of 'REI-Cedar'. In here you
     * will find all of the associate document files that are used to
     * build out the Jeckyll site
     */
    SRC:                path.join( __dirname, 'src' ),


    /**
     * DIST: Distribution Artifact Build Directory
     *
     * NOTE: This is the main Build directory for the REI-Cedar
     * This directory contains the main deliverables for the
     * ui framework, namely:
     *     - The tested and minified CSS
     *     - The tested and minifed JS
     *
     * These deliverables are also consumed by the "Pattern Library" site
     * which contains all of the documentation and examples
     * surrounding the REI-Cedar. This directory is to remain otherwise
     * devoid of *any* other files!
     */
    DIST:               path.join( __dirname, 'dist' ),


    /**
     * DOCS_SRC: Pattern Lib Root
     *
     * NOTE: This is the root of the "Pattern Library" site
     * which is a consumer of the `REI-Cedar` assets,
     * namely:
     *     - The tested and minified CSS
     *     - The tested and minifed JS
     *
     * This serves as the
     */
    DOCS_SRC:           path.join( __dirname, 'docs_src' ),


    /**
     * DOCS_DIST: Pattern Lib Distribution Artifact
     *
     * NOTE: This is the main Build directory for the "Pattern Library" site.
     * This is the directory consumed by the Jeckyll site
     */
    DOCS_DIST:          path.join( __dirname, 'docs_dist' ),


    DOCS_TEMPLATES:     path.join( __dirname, 'docs_src', '_includes', 'markup-templates' ),    // Docs templates directory
    LESS:               [ path.join( __dirname, 'node_modules' ) ],                             // Less import directory
    TEST:               path.join( __dirname, 'test' ),                                         // Specified folder for test / autogenerated files


};

var SHOULD_STOP_FOR_LINT_FAILURE = false;

/**
 * Options for [a11y](https://github.com/addyosmani/a11y)
 */
var A11Y_OPTIONS = pkg.a11y;

/**
 * Options for [pa11y](https://github.com/nature/pa11y#available-options)
 */
var PA11Y_OPTIONS = pkg.pa11y;






//      /$$$$$$$$                  /$$
//     |__  $$__/                 | $$
//        | $$  /$$$$$$   /$$$$$$$| $$   /$$  /$$$$$$$
//        | $$ |____  $$ /$$_____/| $$  /$$/ /$$_____/
//        | $$  /$$$$$$$|  $$$$$$ | $$$$$$/ |  $$$$$$
//        | $$ /$$__  $$ \____  $$| $$_  $$  \____  $$
//        | $$|  $$$$$$$ /$$$$$$$/| $$ \  $$ /$$$$$$$/
//        |__/ \_______/|_______/ |__/  \__/|_______/
//
//
//


// --[ Build ]------------------------------------------------------------------
//
// Generate static assets for the Jekyll site

// --[ Default ]----------------------------------------------------------------
gulp.task( 'default', [
    'master'
] );


// --[ CSS ]--------------------------------------------------------------------
gulp.task( 'css', [
    'css:clean',
    'css:build',
    'css:minify'
] );


// --[ Javascript ]-------------------------------------------------------------
gulp.task( 'js', [
    'js:test:pre-clean',
    'js:test:copy',
    'js:test:browserify-single-components',
    'js:test:inject',
    'js:test:qunit',
    'js:test:post-clean',
    'js:clean',
    'js:build'
]);


// --[ Docs ]-------------------------------------------------------------------
gulp.task( 'docs:clean', [
    'docs:clean-dist',
    'docs:clean-copied-from-src',
    'docs:clean-copied-package',
    'docs:clean-copied-less'
]);


gulp.task( 'docs:copy-all', [
    'docs:copy-css',
    'docs:copy-js',
    'docs:copy-package',
    'docs:copy-less'
]);


gulp.task( 'docs', [
    'docs:clean',
    'docs:copy-all',

    // autoprefixer
    'docs:autoprefixer-css',
    'docs:autoprefixer-examples',

    // csscomb
    'docs:csscomb-css',
    'docs:csscomb-examples',

    // cssmin
    'docs:cssmin-css',

    // Compile Css
    'docs:less:compile',

    // Jekyll-ify docs
    'docs:jekyll'
] );


// --[ Accessability ]----------------------------------------------------------

// Audit all accessibility
gulp.task( 'accessibility:audit', [
    'accessibility:audit-templates',
    'accessibility:audit-docs'
] );

// Audit all experimental accessibility
gulp.task( 'accessibility:audit-exp', [
    'accessibility:audit-pa11y'
] );





//      /$$      /$$                       /$$                        
//     | $$$    /$$$                      | $$                        
//     | $$$$  /$$$$  /$$$$$$   /$$$$$$$ /$$$$$$    /$$$$$$   /$$$$$$ 
//     | $$ $$/$$ $$ |____  $$ /$$_____/|_  $$_/   /$$__  $$ /$$__  $$
//     | $$  $$$| $$  /$$$$$$$|  $$$$$$   | $$    | $$$$$$$$| $$  \__/
//     | $$\  $ | $$ /$$__  $$ \____  $$  | $$ /$$| $$_____/| $$      
//     | $$ \/  | $$|  $$$$$$$ /$$$$$$$/  |  $$$$/|  $$$$$$$| $$      
//     |__/     |__/ \_______/|_______/    \___/   \_______/|__/      
//   
//   
//   

// This will run in this order: 
// * js and css in parallel 
// * docs 
// * Finally call the callback function 
gulp.task( 'master', function( callback ) {
  runSequence( [ 'js', 'css' ], 'docs', callback );
});




//       /$$$$$$   /$$$$$$   /$$$$$$
//      /$$__  $$ /$$__  $$ /$$__  $$
//     | $$  \__/| $$  \__/| $$  \__/
//     | $$      |  $$$$$$ |  $$$$$$
//     | $$       \____  $$ \____  $$
//     | $$    $$ /$$  \ $$ /$$  \ $$
//     |  $$$$$$/|  $$$$$$/|  $$$$$$/
//      \______/  \______/  \______/
//
//
//

// CSS:Clean
gulp.task( 'css:clean', function() {
    return del( [ PATHS.DIST + '**/*.css'] );
});

// Compile the UI framework's Less --> ./dist.
gulp.task( 'css:build', [ 'css:clean' ], function () {

    var lessc = less( { paths: PATHS.LESS } );                              // Create and configure the Less compiler plugin.

    lessc.on( 'error', function ( err ) {
        console.log( 'There was a problem compiling the LESS files...' );
        var errObj = new Error( err );
        console.log( errObj );
        throw errObj;
    } );  // Break on less compile errors

    var lintLessReporter = cssLintLessReporter();

    lintLessReporter.on('error', function (err) {

      // TODO: decide whether to throw the error
      if (SHOULD_STOP_FOR_LINT_FAILURE) {
        throw err;
      }
    });

    return gulp.src( PATHS.SRC + '/less/main.less' )
        .pipe( sourcemaps.init() )
        .pipe( rename( { basename: pkg.name } ) )   // Rename the bundle basename to $PROJECT_NAME-$VERSION
        .pipe( lessc )                              // Build the dev bundle
        .pipe( csslint() )
        .pipe( lintLessReporter )
        .pipe( csscomb() )
        .pipe( postcss( [ autoprefixer( { browsers: [ 'last 2 versions' ] } ) ] ) )
        .pipe( sourcemaps.write() )
        .pipe( gulp.dest( PATHS.DIST ) );
});

// minify the css
gulp.task( 'css:minify', [ 'css:build' ], function(){
    return gulp.src( PATHS.DIST + '/rei-cedar.css' )
        .pipe( rename( { suffix: '.min' } ) )       // Build the minified bundle
        .pipe( minifyCss() )
        .pipe( gulp.dest( PATHS.DIST ) );
});




//         /$$$$$                                                             /$$             /$$
//        |__  $$                                                            |__/            | $$
//           | $$  /$$$$$$  /$$    /$$ /$$$$$$   /$$$$$$$  /$$$$$$$  /$$$$$$  /$$  /$$$$$$  /$$$$$$
//           | $$ |____  $$|  $$  /$$/|____  $$ /$$_____/ /$$_____/ /$$__  $$| $$ /$$__  $$|_  $$_/
//      /$$  | $$  /$$$$$$$ \  $$/$$/  /$$$$$$$|  $$$$$$ | $$      | $$  \__/| $$| $$  \ $$  | $$
//     | $$  | $$ /$$__  $$  \  $$$/  /$$__  $$ \____  $$| $$      | $$      | $$| $$  | $$  | $$ /$$
//     |  $$$$$$/|  $$$$$$$   \  $/  |  $$$$$$$ /$$$$$$$/|  $$$$$$$| $$      | $$| $$$$$$$/  |  $$$$/
//      \______/  \_______/    \_/    \_______/|_______/  \_______/|__/      |__/| $$____/    \___/
//                                                                               | $$
//                                                                               | $$
//                                                                               |__/


// js:clean
// Before clean/deletion, qunit is run to ensure new files will be written.
gulp.task( 'js:clean', [ 'js:test:qunit' ], function() { return del( [ PATHS.DIST + '**/*.js' ] ); });


// js:pre-clean-test
gulp.task( 'js:test:pre-clean', function() { return del( [ PATHS.TEST + '/tmp/js/*' ] ); });


// js:post-clean-test
gulp.task( 'js:test:post-clean', [ 'js:test:qunit' ], function() { return del( [ PATHS.TEST + '/tmp/js/*' ] ); });


// Copy JS for testing
gulp.task( 'js:test:copy', [ 'js:test:pre-clean' ], function() {
    return gulp.src( [ PATHS.SRC + '/js/**/*' ] )
        .pipe( gulp.dest( PATHS.TEST + '/tmp/js' ) );
});


// Compile the UI framework's Javascript --> ./dist. Include the minified version.
gulp.task( 'js:build', [ 'js:test:post-clean' ], function() {
    var bundleStream = browserify( PATHS.SRC + '/js/main.js').bundle();
    return bundleStream
        .pipe( source( PATHS.SRC + '/js/main.js' ) )
        .pipe( streamify( sourcemaps.init() ) )
        .pipe( rename( { dirname: '/', basename: 'rei-cedar' } ) )
        .pipe( streamify( sourcemaps.write() ) )
        .pipe( gulp.dest( PATHS.DIST ) )
        .pipe( rename( { dirname: '/', basename: 'rei-cedar', suffix: '.min' } ) )
        .pipe( streamify( uglify() ) )
        .pipe( gulp.dest( PATHS.DIST ) );
});


// Browserify individual components for test
gulp.task( 'js:test:browserify-single-components', [ 'js:test:copy' ], function( done ) {

    gulp.src( [ PATHS.TEST + '/tmp/js/tests/*.js', PATHS.TEST + '/tmp/js/tests/unit/*.js' ], function( err, files ) {

        if( err ) done( err );

        // browserify all of the files async
        var tasks = files.map( function( entry ) {
            return browserify( { entries: [ entry ] } )
                .bundle()
                .pipe( source( entry ) )
                .pipe( gulp.dest( '' ) );

            });

        // Merge the streams
        es.merge( tasks ).on( 'end', done );
    });
});


// Inject files into js/tests/index.html for testing

gulp.task( 'js:test:inject', [ 'js:test:browserify-single-components' ], function () {
    return gulp.src( PATHS.TEST + '/tmp/js/tests/index.html' )
        // Get all test files and inject into index.html
        .pipe( inject( gulp.src( [ PATHS.TEST + '/tmp/js/tests/unit/*.js'], { read: false } ), { name: 'tests', relative: true } ) )
        .pipe( gulp.dest( PATHS.TEST + '/tmp/js/tests' ) );
});


// Qunit test the components

gulp.task( 'js:test:qunit', [ 'js:test:inject' ], function () {
    // Test that bad boy!
    return gulp.src( path.join( PATHS.TEST, '/tmp/js/tests/index.html' ) )
        .pipe( qunit( {
            'timeout': 20
        } ) );
});




//      /$$$$$$$
//     | $$__  $$
//     | $$  \ $$  /$$$$$$   /$$$$$$$  /$$$$$$$
//     | $$  | $$ /$$__  $$ /$$_____/ /$$_____/
//     | $$  | $$| $$  \ $$| $$      |  $$$$$$
//     | $$  | $$| $$  | $$| $$       \____  $$
//     | $$$$$$$/|  $$$$$$/|  $$$$$$$ /$$$$$$$/
//     |_______/  \______/  \_______/|_______/
//
//
//

// docs:clean-dist: deletes everything in the docs_dist folder
gulp.task( 'docs:clean-dist', function() { return del( [ PATHS.DOCS_DIST + '/*' ] ); });

// docs:clean-copied-from-src: deletes the copied REI-Cedar.* from docs_src
gulp.task( 'docs:clean-copied-from-src', function() { return del( [ PATHS.DOCS_SRC + '/rei-cedar*' ] ); });

// docs:clean-copied-package: deletes `/less/variables.less` from docs_src
gulp.task( 'docs:clean-copied-package', function() { return del( [ PATHS.DOCS_SRC + '/_data/package.json' ] ); });

// docs:clean-copied-variables: deletes `/less/variables.less` from docs_src
gulp.task( 'docs:clean-copied-less', function() { return del( [ PATHS.DOCS_SRC + '/_includes/less/*' ] ); });



// Build REI-Cedar CSS and copy into docs_src directory
gulp.task( 'docs:copy-css', [ 'docs:clean-copied-from-src' ], function () {
    return gulp.src( path.join( PATHS.DIST, '*.css' ) )
        .pipe( gulp.dest( path.join( PATHS.DOCS_SRC ) ) );
} );

// Build old Bootstrap JS and copy into the docs_src directory
gulp.task( 'docs:copy-js', [ 'docs:clean-copied-from-src' ], function () {
    return gulp.src( path.join( PATHS.DIST, '*.js' ) )
        .pipe( gulp.dest( path.join( PATHS.DOCS_SRC ) ) );
} );

// Copy packages to docs_src directory
gulp.task( 'docs:copy-package', [ 'docs:clean-copied-package' ], function () {
    return gulp.src( './package.json' )
        .pipe( gulp.dest( path.join( PATHS.DOCS_SRC, '_data' ) ) );
} );

// Copy variables to docs_src directory
gulp.task( 'docs:copy-less', [ 'docs:clean-copied-less' ], function () {
    return gulp.src( path.join( PATHS.SRC + '/less/**/*' ) )
        .pipe( gulp.dest( path.join( PATHS.DOCS_SRC, '_includes/less' ) ) );
} );




// --[ docs:autoprefixer ]----------------------------------------------------------

gulp.task('docs:autoprefixer-css', [ 'docs:clean', 'docs:copy-all' ], function () {
    return gulp.src( [ 'docs/assets/css/anchor.css', 'docs/assets/css/src/docs.css' ] )
        .pipe( sourcemaps.init() )
        .pipe( postcss( [ autoprefixer( { browsers: [ 'last 2 versions' ] } ) ] ) )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( path.join( PATHS.DOCS_DIST, 'css' ) ) );
});

gulp.task( 'docs:autoprefixer-examples', [ 'docs:clean', 'docs:copy-all' ], function () {
    return gulp.src( PATHS.DOCS_SRC + 'docs/examples/**/*.css' )
        .pipe( sourcemaps.init() )
        .pipe( postcss( [ autoprefixer( { browsers: [ 'last 2 versions' ] } ) ] ) )
        .pipe( sourcemaps.write( '.' ) )
        .pipe( gulp.dest( path.join( PATHS.DOCS_DIST, 'docs/examples/' ) ) );
} );



// --[ docs:csscomb ]----------------------------------------------------------

gulp.task( 'docs:csscomb-css', [ 'docs:clean', 'docs:copy-all' ], function () {
    return gulp.src( ['docs/assets/css/anchor.css', 'docs/assets/css/src/docs.css'] )
        .pipe( csscomb( {
            expand: true,
            cwd: 'dist/css/',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/css/'
        } ) )
        .pipe( gulp.dest( path.join( PATHS.DOCS_DIST, 'css' ) ) );
} );


gulp.task( 'docs:csscomb-examples', [ 'docs:clean', 'docs:copy-all' ], function () {
    return gulp.src( PATHS.DOCS_SRC + 'docs/examples/**/*.css' )
        .pipe( csscomb( {
            expand: true,
            cwd: 'dist/css/',
            src: ['*.css', '!*.min.css'],
            dest: 'dist/css/'
        } ) )
        .pipe( gulp.dest( path.join( PATHS.DOCS_DIST, 'docs/examples/' ) ) );
} );



// --[ docs:cssmin ]----------------------------------------------------------

gulp.task( 'docs:cssmin-css', [ 'docs:clean', 'docs:copy-all' ], function () {
    return gulp.src( PATHS.DOCS_DIST + '/assets/css/src/*.css' )
        .pipe( cssmin() )
        .pipe( rename( { dirname: '/', suffix: '.min' } ) )
        .pipe( gulp.dest( path.join( PATHS.DOCS_DIST, 'css' ) ) );
} );

// Build docs CSS and copy into docs src directory
gulp.task( 'docs:less:compile', [ 'docs:clean', 'docs:copy-all' ], function () {
    var lessc = less( { paths: PATHS.LESS } );  // Create and configure the Less compiler plugin.

    lessc.on( 'error', function ( err ) {
        console.log( 'There was a problem compiling the LESS files...' );
        var errObj = new Error( err );
        console.log( errObj );
        throw errObj;
    } );  // Break on less compile errors


    return gulp.src( path.join( PATHS.DOCS_SRC, '/assets/less/docs.less' ) )
        .pipe( lessc )
        .pipe( gulp.dest( path.join( PATHS.DOCS_SRC, '/assets/css/src' ) ) );
});


gulp.task( 'docs:jekyll', [ 'docs:clean', 'docs:copy-all' ], function ( gulpCallBack ){
    var spawn = require( 'child_process' ).spawn;
    var jekyll = spawn( 'jekyll', [ 'build' ], { stdio: 'inherit' } );

    jekyll.on( 'exit', function( code ) {
        gulpCallBack( code === 0 ? null : 'ERROR: Jekyll process exited with code: ' + code );
    });
});



//       /$$$$$$                                                   /$$ /$$       /$$ /$$ /$$   /$$
//      /$$__  $$                                                 |__/| $$      |__/| $$|__/  | $$
//     | $$  \ $$  /$$$$$$$  /$$$$$$$  /$$$$$$   /$$$$$$$ /$$$$$$$ /$$| $$$$$$$  /$$| $$ /$$ /$$$$$$   /$$   /$$
//     | $$$$$$$$ /$$_____/ /$$_____/ /$$__  $$ /$$_____//$$_____/| $$| $$__  $$| $$| $$| $$|_  $$_/  | $$  | $$
//     | $$__  $$| $$      | $$      | $$$$$$$$|  $$$$$$|  $$$$$$ | $$| $$  \ $$| $$| $$| $$  | $$    | $$  | $$
//     | $$  | $$| $$      | $$      | $$_____/ \____  $$\____  $$| $$| $$  | $$| $$| $$| $$  | $$ /$$| $$  | $$
//     | $$  | $$|  $$$$$$$|  $$$$$$$|  $$$$$$$ /$$$$$$$//$$$$$$$/| $$| $$$$$$$/| $$| $$| $$  |  $$$$/|  $$$$$$$
//     |__/  |__/ \_______/ \_______/ \_______/|_______/|_______/ |__/|_______/ |__/|__/|__/   \___/   \____  $$
//                                                                                                     /$$  | $$
//                                                                                                    |  $$$$$$/
//                                                                                                     \______/


// Audit templates before they are compiled. This task has the fastest feedback
// loop
gulp.task( 'accessibility:audit-templates', function () {
    return gulp.src( path.join( PATHS.DOCS_TEMPLATES, '**', '*.html' ) )
        .pipe( a11y( A11Y_OPTIONS ) )
        .pipe( a11y.reporter() );
} );

// Audit compiled docs. This task is slower, but will cover more. It can give
// color recommendations.
gulp.task( 'accessibility:audit-docs', [ 'docs' ], function () {
    return gulp.src( path.join( PATHS.DOCS_DIST, 'components', 'index.html' ) )
        .pipe( a11y( A11Y_OPTIONS ) )
        .pipe( a11y.reporter() );

} );


// --[ Accessibility Audits - EXPERIMENTAL ]------------------------------------

// Audit using pa11y.
gulp.task( 'accessibility:audit-pa11y', function () {
    return pa11y( PA11Y_OPTIONS )();
} );
