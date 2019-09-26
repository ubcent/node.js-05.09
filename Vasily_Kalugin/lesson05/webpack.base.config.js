// basic vars
const path = require('path');

// additional plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

const PATHS = {
    client: path.join(__dirname, 'client'),
    build: path.join(__dirname, 'build'),
    server: path.join(__dirname, 'server'),
};

const plugins = [
    new HtmlWebpackPlugin({
        template: path.join(PATHS.client, 'index.html'),
        filename: 'index.html',
    }),
    new CopyPlugin([{ from: path.join(PATHS.client, 'public'), to: '' }]),
];

const rules = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
    },
];

module.exports = {
    context: PATHS.client,
    entry: {
        index: path.join(PATHS.client, 'index.js'),
    },
    output: {
        filename: path.join('assets', 'js', '[name].[hash].js'),
        path: PATHS.build,
    },
    externals: {
        PATHS,
    },
    resolve: {
        alias: {
            '~': PATHS.client,
        },
    },
    module: {
        rules,
    },
    plugins,
};
