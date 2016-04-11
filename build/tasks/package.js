var paths = require('../paths');
var gulp = require("gulp");
var webpack = require("webpack-stream");

gulp.task('package', ["compile"], function () {
    return gulp.src([paths.output + "/index.js"])
        .pipe(webpack({
            output: {
                entry: "index.js",
                filename: "dependi.js",
                library: "Dependi",
                libraryTarget: "umd"
            }
        }))
        .pipe(gulp.dest(paths.dist));
});

