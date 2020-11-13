const {
    src,
    dest,
    series,
    watch
} = require('gulp')
const del = require('del')
const htmlmin = require('gulp-htmlmin');
const browserSync=require('browser-sync').create()
const reload=browserSync.reload
// gulp-uglify ==> plugins.uglify 用了插件后相当于 require('gulp-uglify') 适用于 gulp-*
const plugins = require('gulp-load-plugins')()
// 压缩 js uglifyjs
function js(cb) {
    src('js/*.js')
        // 下一个处理环节
        .pipe(plugins.uglify()) // 代码混淆 丑化
        .pipe(dest('./build/js'))
        .pipe(reload({stream:true}))
    cb()
}
// 对 scss/less 编译 压缩 输出 css 文件
function css(cb) {
    src('css/*.scss')
        .pipe(plugins.sass({
            outputStyle: 'compressed'
        }))
        .pipe(plugins.autoprefixer({
            cascade: false,
            remove: false
        }))
        .pipe(dest('./build/css'))
        .pipe(reload({stream:true}))
    cb()
}

function html(cb) {
    var options = {
        removeComments: true, //清除HTML注释
        collapseWhitespace: true, //压缩HTML
        collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
        minifyJS: true, //压缩页面JS
        minifyCSS: true //压缩页面CSS
    };
    src('*.html')
        // .pipe(htmlmin(options))
        // .pipe(dest('build'))
        .pipe(reload({stream:true}))
    cb()
}
// 监听这些文件的变化
function watcher() {
    watch('js/*.js', js)
    watch('css/*.scss', css)
    watch('*.html', html)
}
// 删除 dist 目录中的内容
function clean(cb) {
    // del('./build/js')
    // del('./build/css')
    del('./build')
    cb()
}

function serve(cb){
    browserSync.init({
        server:{
            baseDir:'./'
            // baseDir:'./build'
        }
    })
    cb()
}
// npx gulp scripts
exports.scripts = js
// npx gulp styles
exports.styles = css
// npx gulp clean
exports.clean = clean

// npx gulp
// exports.default=function(){
//     console.log('hello gulp')
// }
exports.default = series([
    clean,
    js,
    css,
    html,
    serve,
    watcher
])