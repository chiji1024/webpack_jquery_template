/**
 * Created by chiji on 2016/11/14.
 */

var webpack = require('webpack');
var ExtractText = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

//develop or production
var state = 'develop';


var extractCss = state !== 'develop'
    ? new ExtractText('css/[name]_[hash].css') : new ExtractText('css_develop/[name].css');
var jqueryPlugin = new webpack.ProvidePlugin({
    $:'jquery',
    jquery: 'jquery'
});
var uglifyJS = new webpack.optimize.UglifyJsPlugin({
    compress: {
        warnings: false
    }
});

module.exports = {

    entry: {
        index: './src/index.js'
    },
    output: {
        path: './dist',
        filename: (state !== 'develop') ? 'js/[name]_[hash].js' :'js_develop/[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                loader: extractCss.extract('style-loader', 'css-loader')
            },
            {
                test:/\.scss$/,
                loader: extractCss.extract(['css','sass'])
            }
        ],
    },
    devServer: {
        contentBase: "./dist",//本地服务器所加载的页面所在的目录
        port: 8080,//default 8080
        colors: true,//终端中输出结果为彩色
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    },
    plugins: [
        extractCss,
        jqueryPlugin
    ]
}

if(state !== 'develop'){
    module.exports.plugins.push(uglifyJS);
}