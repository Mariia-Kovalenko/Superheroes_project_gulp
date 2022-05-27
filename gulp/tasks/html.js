"use strict";
import gulp from "gulp";
//configuration
import path from "../config/path.js";
import app  from "../config/app.js";
//plugins
import fileInclude from "gulp-file-include";
import htmlmin from "gulp-htmlmin";
import size  from "gulp-size";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import webpHTML from "gulp-webp-html";

export default () => {
    return gulp.src(path.html.src)
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "HTML",
            message: error.message,
        }))
    }))
    .pipe(fileInclude())
    .pipe(webpHTML())
    .pipe(size({
        title: "before minification"
    }))
    .pipe(htmlmin(app.htmlmin))
    .pipe(size({
        title: "after minification"
    }))
    .pipe(gulp.dest(path.html.dest));
};

// module.exports = html;