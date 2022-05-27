"use strict";

const isProd = process.argv.includes("--production");
const isDev = !isProd;

export default {
    isProd: isProd,
    isDev: isDev,

    htmlmin: {
        //delete all spaces only for production
        collapseWhitespace: isProd,
    },
    webpack: {
        //if you need a minified js file in dist, change mode to "production"
        mode: isProd ? "production" : "development",
    },
    imagemin: {
        verbose: true
    },
};