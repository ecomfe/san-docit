const merge = require('webpack-merge').default;

const baseWebpackConfig = require('./webpack.base')();

const webpackConfig = merge(baseWebpackConfig, {
    mode: 'production',
    optimization: {
        minimize: false
    }
});

module.exports = function () {
    require('./addPages')(webpackConfig);

    return webpackConfig;
};
