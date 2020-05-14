const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require( "mini-css-extract-plugin" );
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: './src/index.tsx',
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ttf|eot|woff)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            esModule: false,
                        },
                    },
                ],
            },
        ],
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    // optimization: {
    //     minimizer: [
    //         new TerserPlugin({
    //             cache: true,
    //             parallel: true,
    //             sourceMap: true
    //         }),
    //     ],
    //     splitChunks: {
    //         chunks: 'all',
    //         name: true,
    //         maxSize: 24400,
    //         cacheGroups: {
    //             vendor: {
    //                 test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
    //                 name: 'react',
    //                 chunks: 'all',
    //             }
    //         }
    //     }
    // },
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/asset/html/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
    ]
};
