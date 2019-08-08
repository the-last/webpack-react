
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const isPro = process.env.NODE_ENV === "production";
const path  = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const autoprefixer = require("autoprefixer");
const minimist = require ( 'minimist' );


var options = minimist ( process.argv.slice(0) );

console.log(process.argv.slice(1),  '获取打包传参');
console.log(options,  'minimist 转义');

const config = {
    // mode: 'development',
    entry: {
        index: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].[hash:8].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.ejs$/,
                use: "ejs-loader"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                modules: true,
                                localIdentName: "[local]___[hash:base64:5]",
                                importLoaders: 1,
                            }
                        },
                        {
                            loader: "postcss-loader",
                            options: {
                                ident: "postcss",
                                plugins: loader => [autoprefixer()],
                                sourceMap: true
                            }
                        }
                    ]
                })
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            modules: true,
                            localIdentName: "'[path][name]__[local]--[hash:8]'",
                            importLoaders: 2,   //表示在 css-loader 之前有几个loader 默认origin 0 未来版本可能会变。
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            ident: "postcss",
                            plugins: loader => [autoprefixer()],
                            sourceMap: true
                        }
                    },
                    {
                        loader: "less-loader",
                        options: {
                            sourceMap: true,
                            modifyVars: {}  // 定义全局的样式样式变量
                        }
                    }]
                })
            },
            {
                test: /\.(png|jpe?g|gif|ttf|eot|svg|woff|woff2|ico)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 100000,
                            name: "[name].[sha512:hash:base64:7].[ext]"
                        }
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: "json-loader"
            }
        ]
    },
    
    devServer: {
        port: 4001,
        proxy: {
            "/api": {
                target: "http://127.0.0.1:3008/",
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/'
                }
            }
        }

    },
    
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            title: "Webpack Project",
            inject: true,
            hash: true,
            minify: {
                collapseWhitespace: isPro,
                minifyCSS: isPro,
                minifyJS: isPro
            },
            template: './public/index.html'
        }),
        new ExtractTextPlugin("[name].[hash:8].css", { allChunks: true }),
        new CopyWebpackPlugin([
            {
              from: path.resolve(__dirname, "./public"),
              to: path.resolve(__dirname, "./dist"),
              toType: "dir",
              ignore: [".*"]
            }
        ]),
    ],
    resolve: {
        extensions: ['.js', '.jsx','.json']  // 引入文件不需要添加后缀
    }

};

module.exports = config;