"use strict";

import gulp from "gulp";

import path from "../config/path.js";
import app from "../config/app.js";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import rename from "gulp-rename";
import size from "gulp-size";
import shorthand from "gulp-shorthand";
import groupmedia from "gulp-group-css-media-queries";

import dartSass from 'sass';
import gulpSass from 'gulp-sass';
const sass = gulpSass(dartSass);

// import sass from "gulp-sass")(require("sass");
import sassGlob from "gulp-sass-glob";
import webpCss from "gulp-webp-css";


export default () => {
    return gulp.src(path.scss.src, { sourcemaps: app.isDev})
    .pipe(plumber({
        errorHandler: notify.onError(error => ({
            title: "SCSS",
            message: error.message,
        }))
    }))
    .pipe(sassGlob())
    .pipe(sass().on('error', sass.logError))
    //.pipe(webpCss())
    //.pipe(autoprefixer())
    .pipe(shorthand())
    .pipe(groupmedia())
    .pipe(size({
        title: "scss before minification"
    }))
    .pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev}))
    .pipe(rename({suffix: ".min"}))
    .pipe(csso())
    .pipe(size({
        title: "scss after minification"
    }))
    .pipe(gulp.dest(path.scss.dest, { sourcemaps: app.isDev}));
};

// module.exports = scss;