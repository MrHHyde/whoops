const gulp = require("gulp");
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const gulpif = require("gulp-if");
const sass = require('gulp-sass')(require('sass'));
const fancylog = require("fancy-log");

const config = require("./build/config");

gulp.task("compile-js", () => {
    const touples = [];

    for (let app in config.paths.scripts) {
        for (let src in config.paths.scripts[app]) {
            touples.push([app, config.paths.scripts[app][src]]);
        }
    }

    return Promise.all(
        touples.map((touple) => {
            const app = touple[0];
            const src = touple[1];

            fancylog("Compile JS: " + app);

            return new Promise((resolve) => {
                gulp.src(src, { sourcemaps: true })
                    .pipe(concat(app + ".js"), { newLine: "\r\n;" })
                    .pipe(gulp.dest(config.paths.dest.js))
                    .pipe(gulpif(config.uglify, uglify()))
                    .pipe(uglify())
                    .pipe(rename({ extname: ".min.js" }))
                    .pipe(gulp.dest(config.paths.dest.js))
                    .on("end", resolve);
            });
        })
    );
});

gulp.task("compile-vendor-js", function () {
    let jsPaths = [];

    for (let lib in config.paths.assets) {
        config.paths.assets[lib].js.forEach((element) => {
            jsPaths.push(element);
        });
    }

    fancylog("Compiling vendor js");

    return new Promise(function (resolve, reject) {
        gulp.src(jsPaths, { allowEmpty: true })
            .pipe(concat("vendor.min.js", { newLine: "\r\n;" }))
            .pipe(gulpif(config.uglify, uglify()))
            .pipe(gulp.dest(config.paths.dest.js))
            .on("end", resolve || reject);
    });
});

gulp.task("compile-scss", () => {
    return Promise.all(
        config.paths.style.whoops.map((src) => {
            fancylog("Compile whoops styles");

            return new Promise((resolve) => {
                gulp.src(src)
                    .pipe(
                        sass.sync({
                            outputStyle: 'compressed',
                            errLogToConsole: true
                        })
                    )
                    .pipe(rename("whoops.min.css"))
                    .pipe(gulp.dest(config.paths.dest.css))
                    .on("end", resolve);
            });
        })
    );
});

gulp.task("compile-vendor-styles", () => {
    let cssPaths = [];

    for (let lib in config.paths.assets) {
        if (config.paths.assets[lib].css) {
            config.paths.assets[lib].css.forEach((element) => {
                cssPaths.push(element);
            });
        }
    }

    fancylog("Compile vendor styles");

    return Promise.all(
        cssPaths.map((src) => {
            return new Promise((resolve) => {
                gulp.src(src)
                    .pipe(
                        sass.sync({
                            outputStyle: 'compressed',
                            errLogToConsole: true
                        })
                    )
                    .pipe(rename("vendor.min.css"))
                    .pipe(gulp.dest(config.paths.dest.css))
                    .on("end", resolve);
            });
        })
    );
});

gulp.task(
    "build",
    gulp.series(
        "compile-js",
        "compile-scss",
        "compile-vendor-js",
        "compile-vendor-styles",
    )
);
