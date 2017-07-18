var path = require('path')
var projectRoot = path.resolve(__dirname, '../')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var glob = require('glob')
    // add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function(name) {
    baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, extract: true })
    },
    // eval-source-map is faster for development
    devtool: '#eval-source-map',
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': config.dev.env
        }),
        // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
        new webpack.optimize.OccurenceOrderPlugin(),
        new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
        // ,
        // new HtmlWebpackPlugin({
        //   filename: 'index.html',
        //   template: 'index.html',
        //   inject: true
        // })
    ]
})

var pages = getEntry('./src/pages/**/*.html');

for (var pathname in pages) {
    // 配置生成的html文件，定义路径等
    var conf = {
        filename: pathname.slice(pathname.indexOf('src/') > -1 ? ('src/').length : 0) + '.html',
        //template: require('html-webpack-template'), // 模板路径
        template: (function(){
            if(pathname.indexOf('ele')>-1 || pathname.indexOf('info')>-1 || pathname.indexOf('cnode')>-1){
                return pages[pathname]
            }
            return require('path').join(__dirname, '../config/template.ejs')
        })(),
        //template: pages[pathname],
        inject: pathname.indexOf('ele') >-1 || pathname.indexOf('info') >-1 || pathname.indexOf('cnode')>-1, // js插入位置
        // necessary to consistently work with multiple chunks via CommonsChunkPlugin
        chunksSortMode: 'dependency',
        favicon: projectRoot + '/static/images/common/favicon.jpg',
        appMountId: 'app',
        base: 'http://localhost:9007/',
        baseHref: 'http://localhost:9007/',
        title: '电影',
        mobile: true,
        meta: [
          {
            name: 'description',
            content: '电影资讯'
          },
          {
            name: 'keywords',
            content: '电影资讯'
          }
        ]
    };

    if (pathname in module.exports.entry) {
        conf.chunks = ['manifest', 'vendor', pathname];
        conf.hash = true;
    }

    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}

function getEntry(globPath) {
    var entries = {},
        basename, tmp, pathname;

    glob.sync(globPath).forEach(function(entry) {

        basename = path.basename(entry, path.extname(entry));
        tmp = entry.split('/').splice(-3);
        pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径

        entries[pathname] = entry;
    });

    return entries;
}
