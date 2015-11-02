var gulp = require('gulp'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    notify = require("gulp-notify"),
    spritesmith = require('gulp.spritesmith'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;
    
var config = {
    server: {
        baseDir: "./assets"
    },
    tunnel: true,
    host: 'localhost',
    port: 8000,
    reloadDelay: 1000
};
var path = {
    src: { //Пути откуда брать исходники
        html: 'src/*.html', //Синтаксис src/*.html говорит gulp что мы хотим взять все файлы с расширением .html
        js: 'src/js/**/*.js',
        style: 'src/scss/main.scss',
        image: 'src/img/*.{png,jpg,gif}', 
        icons: 'src/img/icons/*.png',
        fonts: 'src/fonts/**/*.*'
    },
    watch: { //Тут мы укажем, за изменением каких файлов мы хотим наблюдать
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.scss',
        image: 'src/img/*.{png,jpg,gif}',
        icons: 'src/img/icons/*.png',
        fonts: 'src/fonts/**/*.*'
    },
    assets: { //Тут мы укажем куда складывать готовые после сборки файлы
        html: 'assets/',
        js: 'assets/js/',
        css: 'assets/css/',
        image: 'assets/img/',
        fonts: 'assets/fonts/'
    },
};
gulp.task('html:build', function () {
    gulp.src(path.src.html) //Выберем файлы по нужному пути
        .pipe(gulp.dest(path.assets.html)) //Выплюнем их в папку build
        .pipe(reload({stream: true}));
});
gulp.task('js:build', function () {
    gulp.src(path.src.js) //Найдем наш main файл
        .pipe(gulp.dest(path.assets.js)) //Выплюнем готовый файл в build
        .pipe(reload({stream: true})); //И перезагрузим сервер
});
gulp.task('sprite:build', function () {
  var spriteData = gulp.src(path.src.icons).pipe(spritesmith({
    imgName: 'sprite.png',
    cssName: 'sprite.scss'
  }));
    spriteData.img.pipe(gulp.dest('src/img/')) // output path for the sprite
    spriteData.css.pipe(gulp.dest('src/scss/partials/'))
    .pipe(reload({stream: true}));
});
gulp.task('style:build', function () {
    gulp.src(path.src.style) //Выберем наш main.scss
        .pipe(sass()) //Скомпилируем
        .pipe(gulp.dest(path.assets.css)) //И в build
        .pipe(notify({ message: 'style task complete' }))
        .pipe(reload({stream: true}));
        
});
gulp.task('image:build', function () {
    gulp.src(path.src.image) //Выберем наши картинки
        .pipe(imagemin({ //Сожмем их
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest(path.assets.image)) //И бросим в build
        .pipe(reload({stream: true}));
});
gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.assets.fonts))
        .pipe(reload({stream: true}));
});
gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    'sprite:build',
    'fonts:build',
    'image:build',
]);
gulp.task('webserver', function () {
    browserSync(config);
});
gulp.task('watch', function(){
    gulp.watch([path.watch.html], ['html:build']);
    gulp.watch([path.watch.style],['style:build']);
    gulp.watch([path.watch.icons],['sprite:build']);
    gulp.watch([path.watch.js], ['js:build']);
    gulp.watch([path.watch.image], ['image:build']);
    gulp.watch([path.watch.fonts], ['fonts:build']);
});

gulp.task('default', ['build','webserver','watch']);