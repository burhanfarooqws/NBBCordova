'use strict';

import config      from '../config';
import changed     from 'gulp-changed';
import gulp        from 'gulp';
import browserSync from 'browser-sync';

gulp.task('nbblib', function() {

    return gulp.src(config.nbbLibAssets.src)
        .pipe(changed(config.nbbLibAssets.dest)) // Ignore unchanged files
        .pipe(gulp.dest(config.nbbLibAssets.dest))
        .pipe(browserSync.stream());

});
