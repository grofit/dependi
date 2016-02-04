var paths = require("../paths");
var gulp = require('gulp');
var jasmine = require('gulp-jasmine');

gulp.task('tests', function () {
    return gulp.src(paths.tests)
        .pipe(jasmine({
            helpers: [
                'dist/bind.js'
            ]
        }));
});