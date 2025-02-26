const gulp = require('gulp');
const { src, dest, series, task } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const processHtml = require('gulp-processhtml');
const cleanCSS = require('gulp-clean-css');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

// Tarea para compilar Sass y grabar en carpeta.
function compilarSass() {
    return src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./assets/css'));
}


gulp.task('sass', function() {
    return src('./scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('./assets/css'));
});


// Tarea para vigilar cambios
gulp.task('watch', function() {
    gulp.watch('./scss/**/*.scss', series('sass'));
});


// Tarea por defecto que ejecuta las dos tareas anteriores.
// Solo poner gulp en cmd.
gulp.task('default', series('sass', 'watch'));


// Tarea que minimiza y guarda el archivo modificado.
function cssminTask() {
    return src('./scss/style.scss')
        .pipe(sass()) // Compila SCSS a CSS comprimido
        .pipe(cleanCSS({ compatibility: 'ie8' })) // Minimiza aún más el CSS (si es necesario)
        .pipe(rename({ suffix: ".min", extname: ".css" })) // Renombra el archivo
        .pipe(dest('./dist/css')); // Guarda el archivo en ./dist/css
}


// Tarea para renombrar el archivo. Se puede llamar individualmente.
function renameTask() {
    return src('./assets/css/style.css')
        .pipe(rename({ suffix: ".min", extname: ".css" }))
        .pipe(dest('./dist/css'));
}

// Tarea que procesa el HTML gracias a comentarios. Luego sube al directorio.
function processHtmlTask() {
    return src('./*.html')
        .pipe(processHtml())
        .pipe(dest('./dist'));
}

function subirImagenes (){
    return src('./assets/img/*')
        .pipe(dest('./dist/img'));
}

function subirJs() {
    return src('./assets/js/*')
        .pipe(dest('./dist/js'));
}

// Tarea que minimiza y renombra y guardará.
gulp.task('minRenCssHtmlSubir', series(cssminTask, processHtmlTask));
gulp.task('imgJsSubir', series(subirImagenes,subirJs));

exports.sass = compilarSass;



