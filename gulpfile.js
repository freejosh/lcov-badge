const del = require('del');
const gulp = require('gulp');

function clean() {
    return del(['dist']);
}

function copyExe() {
    return gulp.src('lcov-badge').pipe(gulp.dest('dist'));
}

function copyPackageFiles() {
    return gulp.src(['package.json', 'README.md', 'LICENSE']).pipe(gulp.dest('dist'));
}

module.exports.clean = clean;
module.exports.postbuild = gulp.series(copyExe, copyPackageFiles);
