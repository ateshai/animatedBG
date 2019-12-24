'use-strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var spritesmith = require('gulp.spritesmith');

var sassPath = './assets/styles/sass/**/*.scss';
var sassDest = './assets/styles/css';


gulp.task('sass', function () {
    return gulp.src(sassPath)
        .pipe(sass({includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']}).on('error', sass.logError))
        .pipe(gulp.dest(sassDest));
});

gulp.task('sassCompressed', function () {
    return gulp.src(sassPath)
        .pipe(sass({outputStyle: 'compressed', includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']}).on('error', sass.logError))
        .pipe(gulp.dest(sassDest));
});

gulp.task('sassCompact', function () {
    return gulp.src(sassPath)
        .pipe(sass({outputStyle: 'compact', includePaths: ['node_modules/bootstrap-sass/assets/stylesheets']}).on('error', sass.logError))
        .pipe(gulp.dest(sassDest));
});

// sprite
gulp.task('sprite', function () {
    var spriteData = gulp.src('./assets/images/sprites/*.png').pipe(spritesmith({
        imgName: 'images/sprite.png',
        cssName: 'styles/sass/_sprite.scss'
    }));
    return spriteData.pipe(gulp.dest('./assets/'));
});



gulp.task('sass:watch', function () {
    gulp.watch(sassPath, ['sass']);
});

gulp.task('sassCompact:watch', function () {
    gulp.watch(sassPath, ['sassCompact']);
});
