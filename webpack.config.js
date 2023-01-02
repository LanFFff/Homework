const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    mode: 'development',
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'docs'),
        clean: true,
        publicPath: './',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, './src/index.html'),
            filename: 'index.html',
            inject: true,
            esModule: false,
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.art$/,
                loader: 'art-template-loader',
            },
            {
                test: /\.(jpg|jpeg|png|gif|svg)$/, // 针对这三种格式的文件使用file-loader处理
                use: {
                    loader: 'file-loader',
                    options: {
                        esModule: false,
                        name: '[name]_[hash].[ext]',
                        outputPath: 'images/',
                    },
                },
            },
        ],
    },
    devServer: {
        static: './docs',
    },
    devtool: 'inline-source-map',
};
