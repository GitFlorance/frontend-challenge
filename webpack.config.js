const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');
const paths = {
    src: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    public: path.join(__dirname, 'public/'),
};

module.exports = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, 'src/index.tsx'),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                include: paths.src,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            inject: 'body',
        }),
    ],
    resolve: {
        extensions: [ '*', '.tsx', '.ts', '.js', '.jsx', ],
        alias: {
            '@': paths.src,
            '@styled': path.join(__dirname, 'src/styled-components'),
        }
    },
    output: {
        path: paths.dist,
        publicPath: './',
        filename: 'js/bundle.js',
    },
    devServer: {
        contentBase: paths.public,
        port: 3000,
        publicPath: "http://localhost:3000/",
        hotOnly: true
    },
};