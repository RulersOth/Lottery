const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    name: 'word-relay-setting',
    mode: 'development', //real time: production
    devtool: 'eval',
    resolve: {
        extensions: ['.js', '.jsx']
    },

    entry: {
        app: ['./client'],
    }, //input

    module: {
        rules: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            options: {
                presets: [['@babel/preset-env', {
                    targets: {
                        browsers:['> 5% in KR'],
                    },
                    debug: true,
                }], '@babel/preset-react',
            ],
                plugins: ['@babel/plugin-proposal-class-properties',
                          'react-hot-loader/babel',
        ],
            },
        },
    {
        test: /\.s?css$/,
        use: [
            MiniCssExtractPlugin.loader,
            {loader: 'css-loader', options: {sourceMap: true}},
            //{loader: 'sass-loader', options: {sourceMap: true}},
            //{loader: 'style-loader', options: {sourceMap: true}}
        ]
    }
    ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        })
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'app.js'
    }, //output
};