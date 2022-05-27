"use strict";
import gulp from "gulp";
import browserSync from "browser-sync";

//configuration
import path from "./gulp/config/path.js";
import app from "./gulp/config/app.js";

//tasks
import clear from "./gulp/tasks/clear.js";
import html from "./gulp/tasks/html.js";
import scss from "./gulp/tasks/scss.js";
//import css from "./tasks/css.js";
import js from "./gulp/tasks/javascript.js";
import img from "./gulp/tasks/img.js";
import zip from './gulp/tasks/zip.js';

//tracking changes
const watcher = () =>{
    gulp.watch(path.html.watch, html).on("all", browserSync.reload);
    gulp.watch(path.scss.watch, scss).on("all", browserSync.reload);
    gulp.watch(path.js.watch, js).on("all", browserSync.reload);
    gulp.watch(path.img.watch, img).on("all", browserSync.reload);
};



//syncronisation
const server = () => {
    browserSync.init({
        server: {
            baseDir: path.root
        }
    });
};

//build
const build = gulp.series(
    clear,
    gulp.parallel(html,scss, js, img)
);

const dev = gulp.series(
    build,
    gulp.parallel(watcher, server)
);

const deployZip = gulp.series(build, zip);

export { html };
export { watcher };
export { clear };
export { scss };
export { js };
export { img };
export {deployZip};


//building 
export default app.isProd ? build : dev;

