'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browserSync from 'browser-sync';

gulp.task('nbbcss', function() {

    return gulp.src(config.nbbCSSAssets.src)
        .pipe(changed(config.nbbCSSAssets.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.nbbCSSAssets.dest))
        .pipe(browserSync.stream());

});
