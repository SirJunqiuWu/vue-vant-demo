'use strict';
const path = require('path');
const defaultSettings = require('./src/settings.js');

const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const LessFunc = require('less-plugin-functions');

function resolve(dir) {
    return path.join(__dirname, dir)
}

const name = defaultSettings.title || '麦吉丽';// page title
// If your port is set to 80,
// use administrator privileges to execute the command line.
// For example, Mac: sudo npm run
const port = process.env.VUE_APP_PORT || 9528; // dev port

// All configuration item explanations can be find in https://cli.vuejs.org/config/
module.exports = {
    /**
     * You will need to set publicPath if you plan to deploy your site under a sub path,
     * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
     * then publicPath should be set to "/bar/".
     * In most cases please use '/' !!!
     * Detail: https://cli.vuejs.org/config/#publicpath
     */
    // publicPath: '/order-mall/',
    publicPath: '/',
    // outputDir: 'dist/order-mall',
    outputDir: 'dist/l',
    assetsDir: 'static',
    lintOnSave: process.env.NODE_ENV === 'development',
    productionSourceMap: false,
    // filenameHashing:false,
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    autoprefixer(),
                    pxtorem({
                      rootValue: 37.5, // 基准值
                      unitPrecision:5, // 允许rem单位增长到的十进制数字
                      propList: ['*'],
                      // 该项仅在使用 Circle 组件时需要
                      // 原因参见 https://github.com/youzan/vant/issues/1948
                      selectorBlackList: ['van-circle__layer'],
                      minPixelValue: 3 // 设置要替换的最小像素值(3px以上才会被转rem)。
                    })
                ]
            },
            less: {
                plugins: [
                    new LessFunc()
                ]
            }
        }
    },
    devServer: {
        port: port,
        open: false,
        disableHostCheck: true,
        overlay: {
            warnings: false,
            errors: true
        },
    },
    configureWebpack: {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        name: name,
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        plugins: [
            // new webpack.ProvidePlugin({
            //   Vue: ['vue/dist/vue.runtime.esm.js', 'default']
            // })
        ],
    },
    chainWebpack(config) {
        config.plugins.delete('preload-index');
        config.plugins.delete('preload');
        config.plugins.delete('preload-index');
        config.plugins.delete('prefetch');

        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();

        // set preserveWhitespace
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.compilerOptions.preserveWhitespace = true;
                return options
            })
            .end();

        config
        // https://webpack.js.org/configuration/devtool/#development
            .when(process.env.NODE_ENV === 'development',
                config => config.devtool('cheap-source-map')
            );

        config
            .when(process.env.NODE_ENV !== 'development',
                config => {
                    config
                        .plugin('ScriptExtHtmlWebpackPlugin')
                        .after('html')
                        .use('script-ext-html-webpack-plugin', [{
                            // `runtime` must same as runtimeChunk name. default is `runtime`
                            inline: /runtime\..*\.js$/
                        }])
                        .end();
                    config
                        .optimization.splitChunks({
                        chunks: 'all',
                        cacheGroups: {
                            libs: {
                                name: 'chunk-libs',
                                test: /[\\/]node_modules[\\/]/,
                                priority: 10,
                                chunks: 'initial' // only package third parties that are initially dependent
                            },
                            elementUI: {
                                name: 'chunk-elementUI', // split elementUI into a single package
                                priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
                                test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
                            },
                            commons: {
                                name: 'chunk-commons',
                                test: resolve('src/components'), // can customize your rules
                                minChunks: 3, //  minimum common number
                                priority: 5,
                                reuseExistingChunk: true
                            }
                        }
                    });
                    config.optimization.runtimeChunk('single')
                }
            );
      /***
       * 新增
       */
      config
        .when(process.env.NODE_ENV !== 'development',
          config => {

            config.output.filename('static/js/[name].js?t=[hash:7]').end();
            config.output.chunkFilename('static/js/[name].js?t=[hash:7]').end();
            // 为生产环境修改配置...
            config.plugin('extract-css').tap(args => [{
              filename: 'static/css/[name].css?t=[hash:7]',
              chunkFilename: 'static/css/[name].css?t=[hash:7]'
            }])


            // config.output
            //   .filename('static/js/[name].js?t=[contenthash:8]')
            //   .chunkFilename('static/js/[name].js?t=[contenthash:8]')
            //   .end();
            // // config.module
            // //   .rule('images')
            // //   .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
            // //   .use('url-loader')
            // //   .loader('url-loader')
            // //   .options({
            // //     limit: 4096,
            // //     // use explicit fallback to avoid regression in url-loader>=1.1.0
            // //     fallback: {
            // //       loader: 'file-loader',
            // //       options: {
            // //         name: 'static/img/[name].[ext]?t=[hash:8]'
            // //       }
            // //     }
            // //   });
            // config.plugin("extract-css").tap(args => [{
            //   filename: 'static/css/[name].css?t=[hash:8]',
            //   chunkFilename: 'static/css/[name].css?t=[hash:8]'
            // }])
          }
        )
    }
};
