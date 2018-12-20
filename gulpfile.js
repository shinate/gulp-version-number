/**
 * Created by shinate on 2018/10/12.
 */
var gulp = require('gulp');
var gvn = require('./index');

gulp.task('all', function () {
    return gulp.src('_test/src/all.html')
        .pipe(gvn({
            append: {
                to: [
                    ['image', '%MD5%'],
                    {
                        type : 'css',
                        attr : ['href', 'custom-href'],
                        key  : '_VeRsIoN_',
                        value: '%MDS%'
                    },
                    {
                        type : 'js',
                        attr : ['custom-src', 'node-js-loader'], // but "src" not matched, strictly use this custom
                        key  : '_VeRsIoN_',
                        value: '%TS%'
                    }
                ]
            }
        }))
        .pipe(gulp.dest('_test/dist'));
});