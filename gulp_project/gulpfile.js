
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');

// Diretórios de origem e destino
const paths = {
    sass: {
        src: 'src/sass/**/*.scss',
        dest: 'dist/css'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'dist/images'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js'
    }
};

// Compilação do SASS
function compileSass() {
    return gulp.src(paths.sass.src)
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.sass.dest));
}

// Compressão de imagens
function compressImages() {
    return gulp.src(paths.images.src, { allowEmpty: true })
        .pipe(imagemin())
        .pipe(gulp.dest(paths.images.dest));
}

// Compressão de código JavaScript
function compressScripts() {
    return gulp.src(paths.scripts.src, { allowEmpty: true })
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(paths.scripts.dest));
}

// Tarefa de observação
function watchFiles() {
    gulp.watch(paths.sass.src, compileSass);
    gulp.watch(paths.images.src, compressImages);
    gulp.watch(paths.scripts.src, compressScripts);
}

// Exportando tarefas
exports.compileSass = compileSass;
exports.compressImages = compressImages;
exports.compressScripts = compressScripts;
exports.watch = watchFiles;

// Tarefa padrão
exports.default = gulp.series(
    gulp.parallel(compileSass, compressImages, compressScripts),
    watchFiles
);
