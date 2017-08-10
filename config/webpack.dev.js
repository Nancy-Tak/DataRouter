///**
// * 开发构建配置
// */
//const path = require('path');
//const webpack = require('webpack');
//// 公用配置
//const commonConfig = require('./webpack.common');
//// WDS
//const utils = require('./utils');
//const HOST = utils.getIP();
//const PORT = 8624;
//module.exports = Object.assign(commonConfig, {
//    devtool: 'eval', // 'cheap-source-map'
//    cache: true,
//    plugins: commonConfig.plugins.concat([
//        // 配置全局常量
//        new webpack.DefinePlugin({
//            'process.env': { // React/Redux打包常用
//                NODE_ENV: JSON.stringify('development')
//            },
//            __DEV__: true,
//            __WHY_DID_YOU_UPDATE__: false // 是否检测不必要的组件重渲染
//        })
//    ]),
//    // webpack dev server 配置
//    devServer: {
//        host: HOST,
//        port: PORT,
//        historyApiFallback: {
//            rewrites: [
//                // shows views/landing.html as the landing page
//                {from: /^\/$/, to: '/views/landing.html'},
//                // shows views/subpage.html for all routes starting with /subpage
//                {from: /^\/subpage/, to: '/views/subpage.html'},
//                // shows views/404.html on all other pages
//                {from: /./, to: '/views/404.html'},
//            ],
//        },
//        proxy: [
//            {
//                context: ['/shuyou/**', '/api/**'],
//                target: 'http://10.1.21.12:9082/',
//                secure: false
//            }
//        ]
//
//        /* proxy: {
//         '/api/!*': {
//         target: 'http://192.168.8.160:20160/',
//         pathRewrite: {
//         '^/api': ''
//         },
//         secure: false
//         },
//         '/local/!*': {
//         target: 'http://127.0.0.1:9999/',
//         pathRewrite: {
//         '^/local': ''
//         },
//         secure: false
//         }
//         }*/
//    }
//});

/**
 * RAP mock构建配置
 */
const path = require('path');
const webpack = require('webpack');
// 公用配置
const commonConfig = require('./webpack.common');
// WDS
const utils = require('./utils');
const HOST = utils.getIP();
const PORT = 8624;
const projectId = 7; //RAP上的projectId

module.exports = Object.assign(commonConfig, {
    devtool: 'source-map', // 'eval'  生产配置这个： cheap-source-map  测试配置这个：source-map
    cache: true,
    plugins: commonConfig.plugins.concat([
        // 配置全局常量
        new webpack.DefinePlugin({
            'process.env': { // React/Redux打包常用
                NODE_ENV: JSON.stringify('development')
            },
            __DEV__: true,
            __CORS__: false // CORS跨域请求
        })
    ]),
    // webpack dev server 配置
    devServer: {
        host: HOST,
        port: PORT,
        proxy: {
            '/shuyou/*': {
                target: 'http://10.1.21.18:8080/',
                pathRewrite: {
                    //'^/shuyou': `/mockjsdata/${projectId}/shuyou/`
                },
                secure: false,
                changeOrigin: true,
            }
        }
    }
});

