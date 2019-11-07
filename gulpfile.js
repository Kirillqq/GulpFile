var gulp         = require('gulp');
var concat       = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer')
var cleanCSS     = require('gulp-clean-css')
var uglify       = require('gulp-uglify')
var del          = require('del')
var browserSync  = require('browser-sync').create()

const cssFiles = [
	'app/css/main.css', 
	'app/css/media.css'
]

const jsFiles = [
	'app/js/lib.js', 
	'app/js/main.js'
]

function styles() {
	return gulp.src(cssFiles)
	.pipe(concat('style.css'))

	.pipe(autoprefixer({
		cascade: false
	}))

	.pipe(cleanCSS({
		level: 2
	}))

	.pipe(gulp.dest('dist/css'))

	.pipe(browserSync.stream())
}

function scripts(){
	return gulp.src(jsFiles)

	.pipe(concat('script.js'))

	.pipe(uglify({
		toplevel: true
	}))

	.pipe(gulp.dest('dist/js'))

	.pipe(browserSync.stream())
}

function clean(){
	return del(['build/*'])
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch('app/css/**/*.css', styles)
	gulp.watch('app/js/**/*.js', scripts)
	gulp.watch('*.html').on('change', browserSync.reload)
}

gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts)));
gulp.task('dev', gulp.series('build', 'watch'));