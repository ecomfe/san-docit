
// 3个级别的配置，0：基础版，SSR用；1：开发版；2：发布版
module.exports = function(level = 0) {
    const basicRules = [{
        test: /\.css$/,
        use: ['css-loader']
    },
    {
        test: /\.less$/,
        use: [
            'css-loader', 
            {
                loader: 'less-loader',
                options: {
                    sourceMap: false,
                    lessOptions: {
                        javascriptEnabled: true
                    }
                }
            }
        ]
    }];

    const config = {
        module: {
            rules: basicRules
        },
        plugins: []
    };

    if (level === 1) {
        basicRules.map(rule => {
            rule.use.unshift('style-loader');
        });
    }

    if (level === 2) {
        const MiniCssExtractPlugin = require('mini-css-extract-plugin');
        basicRules.map(rule => {
            rule.use.unshift(MiniCssExtractPlugin.loader);
        });

        config.plugins.push(new MiniCssExtractPlugin({
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[name].css'
        }));
    }

    return config;
};
