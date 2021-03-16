const webpack = require("webpack")
const path = require("path")
const CompressPlugin = require('compress-webpack-plugin')
const productionGzipExtensions = ['js', 'css']

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/e-book/" : "/",
  outputDir: "dist",
  assetsDir: "static",
  indexPath: "index.html",
  filenameHashing: true,
  lintOnSave: process.env.NODE_ENV !== "production",
  transpileDependencies: [],
  productionSourceMap: false,
  integrity: false,
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jquery: "jquery",
        jQuery: "jquery",
        "window.jQuery": 'jquery'
      }),
      new CompressPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }),
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 5, 
        minChunkSize: 1000
      })
    ],
    resolve: {
      alias: {
        "@assets": path.resolve(__dirname, "src/assets"),
        "@libs": path.resolve(__dirname, "src/libs"),
        "@cmp": path.resolve(__dirname, "src/components"),
        "@store": path.resolve(__dirname, "src/store"),
        "@views": path.resolve(__dirname, "src/views")
      }
    }
  },
  chainWebpack: config => {},
  css: {
    requireModuleExtension: true,
    extract: process.env.NODE_ENV === "production" ? true : false,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 全局引入公共样式
        // prependData: '@import "~@/assets/scss/variables.scss";'
      }
    }
  },
  // 代理配置
  devServer: {
    port: 8090,
    open: true
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3000",
    //     pathRewrite: {
    //       "^/api": ""
    //     },
    //     secure: false // 可在https上且使用了无效证书的后端服务器上运行
    //   }
    // }
  },
  // 插件
  pluginOptions: {}
};
