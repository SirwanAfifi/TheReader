var gulp = require('gulp'),
    watch = require('gulp-watch'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del'),
    ngAnnotate = require('gulp-ng-annotate');


gulp.task('layout_main_js', function () {
    return gulp.src([
        'public/lib/bootstrap/dist/js/bootstrap.min.js',
        'public/lib/moment/min/moment.min.js',
        'public/lib/angular/angular.min.js',
        'public/lib/angular-component-router/angular_1_router.js',
        'public/lib/angular-animate/angular-animate.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/lib/angular-sanitize/angular-sanitize.min.js',
        'public/app/app.js'
    ])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('allJS.min.js'))
        .pipe(gulp.dest('public/min'));
});

gulp.task('book_view_js', function () {
    return gulp.src([
        'public/lib/underscore/underscore-min.js',
        'public/app/controllers/books/bookController.js',
        'public/app/services/bookService.js',
        'public/app/services/modalService.js',
        'public/app/services/GravatarUrlBuilder.js'
    ])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('book.min.js'))
        .pipe(gulp.dest('public/min'));
});


// SPA
gulp.task('spa_layout_main_js', function () {
    return gulp.src([
        'public/lib/bootstrap/dist/js/bootstrap.min.js',
        'public/lib/moment/min/moment.min.js',
        'public/lib/angular/angular.min.js',
        'public/lib/angular-animate/angular-animate.min.js',
        'public/lib/AngularJS-Toaster/toaster.min.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'public/lib/angular-sanitize/angular-sanitize.min.js',
        'public/lib/angular-component-router/angular_1_router.js',
        'public/app/app.js',
        'public/lib/underscore/underscore-min.js',
        'public/app/services/userService.js',
        'public/app/services/bookService.js',
        'public/app/services/accountService.js',
        'public/app/services/modalService.js',
        'public/app/services/GravatarUrlBuilder.js',
        'public/app/components/home.component.js',
        'public/app/components/book-list.component.js',
        'public/app/components/book-app.component.js',
        'public/app/components/login.component.js',
        'public/app/components/login-partial.component.js'
    ])
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(concat('spa.min.js'))
        .pipe(gulp.dest('public/min'));
});
