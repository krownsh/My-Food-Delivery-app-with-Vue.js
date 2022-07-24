'use strict'
require('./check-versions')()

const config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const opn = require('opn')
const path = require('path')
const express = require('express')
const webpack = require('webpack')
const proxyMiddleware = require('http-proxy-middleware')
const webpackConfig = require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
// 阜號8080
const port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
// 是否自動開啟瀏覽器
const autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
const proxyTable = config.dev.proxyTable

const app = express()

// 1、獲取json數據
var goods = require('../data/星巴克(店家菜單).json');
var ratings = require('../data/星巴克(店家評價).json');
var seller = require('../data/星巴克(店家資訊).json');


// 2、路由
var routes = express.Router();

// 3、接口
routes.get('/goods', (req,res) => {
	// 返回數據到客户端，返回json數據
	res.json(goods);
});
routes.get('/ratings', (req,res) => {
	// 返回數據到客户端，返回json數據
	res.json(ratings);
});

routes.get('/seller', (req,res) => {
	// 返回數據到客户端，返回json數據
	res.json(seller);
});

// 4、中間件
app.use('/api',routes);




const compiler = webpack(webpackConfig)

// 是給webpack-dev-middleware中間件使用的
// express專門為webpack開發的中間件
// 放置内存中
const devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

// 熱加載
const hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
// currently disabled until this is resolved:
// https://github.com/jantimon/html-webpack-plugin/issues/680
// compiler.plugin('compilation', function (compilation) {
//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
//     hotMiddleware.publish({ action: 'reload' })
//     cb()
//   })
// })

// enable hot-reload and state-preserving
// compilation error display
// 對中間件的使用
app.use(hotMiddleware)

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  let options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// serve pure static assets
// 靜態資源訪問路徑
const staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

const uri = 'http://localhost:' + port

var _resolve
var _reject
var readyPromise = new Promise((resolve, reject) => {
  _resolve = resolve
  _reject = reject
})

var server
var portfinder = require('portfinder')
portfinder.basePort = port

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  portfinder.getPort((err, port) => {
    if (err) {
      _reject(err)
    }
    process.env.PORT = port
    var uri = 'http://localhost:' + port
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
      opn(uri)
    }
    server = app.listen(port)
    _resolve()
  })
})

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
