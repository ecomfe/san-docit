require('@babel/register')({
    ignore: []
});

const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const SanLoaderPlugin = require('san-loader/lib/plugin');

module.exports = {
    devtool: false,
    mode: 'development',
    context: __dirname,
    entry: path.join(__dirname, 'src', 'main.js'),
    output: {
        path: path.join(__dirname, 'dist'),
    },
    devServer: {
        port: 8001,
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.san$/,
                use: 'san-loader',
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ],
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.md$/,
                // use: [{
                //     loader: 'vue-loader',
                //     options: {
                //         compilerOptions: {
                //             preserveWhitespace: false
                //         }
                //     }
                // },
                // {
                //     loader: require.resolve('./packages/markdown-loader')
                // }]
                use: ['san-loader', '../markdown-loader']
                // use: [{
                //     loader: 'san-loader',
                //     options: {
                //         loaders: './packages/markdown-loader'
                //     }
                // }]
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.san', '.json'],
    },
    plugins: [
        new SanLoaderPlugin(),
        new HTMLWebpackPlugin({template: 'index.html'})
    ],
};
