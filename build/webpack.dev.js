const path = require('path');
const {default: merge} = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const history = require('connect-history-api-fallback');

module.exports = function () {
    const config = require('./config').load();
    const baseWebpackConfig = require('./webpack.base')();

    return merge(baseWebpackConfig, {
        devServer: {
            before: function(app) {
                app.use(history());
            }
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: path.join(__dirname, '../index.ejs'),
                filename: 'index.html',
                chunks: ['main'],
                ...config
            })
        ]
    });
};
