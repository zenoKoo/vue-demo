// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '../',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 9007,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
        '/movie': {
            target: 'http://api.douban.com/v2/',
            changeOrigin: true
        }
    },
    context: [ //代理路径
        '/shopping',
        '/ugc',
        '/v1',
        '/v2',
        '/v3',
        '/v4',
        '/bos',
        '/member',
        '/promotion',
        '/eus',
    ],
    proxypath: 'https://mainsite-restapi.ele.me',
    cssSourceMap: false
  }
}
