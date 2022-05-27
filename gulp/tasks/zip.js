"use strict";
import gulp from "gulp";
import path from "../config/path.js";
import del from "del";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import zipPlugin from "gulp-zip";


export default () => {
    del(`./${path.rootFolder}/**/*.*`, {});
    return gulp.src(`${path.root}/**/*.*`, {})
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "ZIP",
            message: error.message,
        }))
    }))
    .pipe(zipPlugin(`${path.rootFolder}.zip`))
    .pipe(gulp.dest(path.root));
};