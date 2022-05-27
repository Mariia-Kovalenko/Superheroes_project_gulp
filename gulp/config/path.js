"use strict";
import * as nodePath from 'path';

const pathSrc = "./src";
const pathDest = "./dist";

export default {
    root: pathDest,
    rootFolder: nodePath.basename(nodePath.resolve()),

    html: {
        src: pathSrc + '/html/*.html',
        watch: pathSrc + '/html/**/*.html',
        dest: pathDest
    },

    css: {
        src: pathSrc + '/css/*.css',
        watch: pathSrc + '/css/**/*.css',
        dest: pathDest + '/css'
    },
    scss: {
        src: pathSrc + '/sass/*.scss',
        watch: pathSrc + '/sass/**/*.scss',
        dest: pathDest + '/css'
    },
    js: {
        src: pathSrc + '/js/*.js',
        watch: pathSrc + '/js/**/*.js',
        dest: pathDest + '/js'
    },
    img: {
        src: pathSrc + '/img/*.{png,jpg,jpeg,gif,svg}',
        watch: pathSrc + '/img/**/*.{png,jpg,jpeg,gif,svg}',
        dest: pathDest + '/img'
    },
};