const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BabiliPlugin = require("babili-webpack-plugin");

const getPath = p => path.resolve(__dirname, p);
module.exports = {
    entry: {
        'comm100-react-components': getPath('../modules/index.js')
    },

    output: {
        path: getPath('../dist/'),
        filename: '[name].js',
        library: 'comm100-react-components',
        libraryTarget: 'umd',
        sourceMapFilename: '[file].map',
    },

    externals: [{
            react: {
                root: 'React',
                commonjs2: 'react',
                commonjs: 'react',
                amd: 'react'
            },
        },
        {
            lodash: {
                root: '_',
                commonjs: 'lodash',
                commonjs2: 'lodash',
                amd: 'lodash'
            }
        },
        {
            classnames: {
                root: '_',
                commonjs: 'classnames',
                commonjs2: 'classnames',
                amd: 'classnames'
            }
        },
        {
            'prop-types': {
                root: 'prop-types',
                commonjs: 'prop-types',
                commonjs2: 'prop-types',
                amd: 'prop-types'
            }
        },
        {
            'rc-calendar': {
                root: 'rc-calendar',
                commonjs: 'rc-calendar',
                commonjs2: 'rc-calendar',
                amd: 'rc-calendar'
            }
        },
        {
            'rc-time-picker': {
                root: 'rc-time-picker',
                commonjs: 'rc-time-picker',
                commonjs2: 'rc-time-picker',
                amd: 'rc-time-picker'
            }
        },
        {
            'react-dom': {
                root: 'react-dom',
                commonjs: 'react-dom',
                commonjs2: 'react-dom',
                amd: 'react-dom'
            }
        },
        {
            'react-modal': {
                root: 'react-modal',
                commonjs: 'react-modal',
                commonjs2: 'react-modal',
                amd: 'react-modal'
            }
        },
        {
            'react-tooltip': {
                root: 'react-tooltip',
                commonjs: 'react-tooltip',
                commonjs2: 'react-tooltip',
                amd: 'react-tooltip'
            }
        }
    ],

    module: {
        rules: [{
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                minimize: true,
                                localIdentName: '[name]__[local]--[hash:base64:5]',
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    return [
                                        require('postcss-cssnext'),
                                    ];
                                },
                            },
                        },
                    ],
                }),
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                minimize: true,
                            },
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins() {
                                    return [
                                        require('postcss-cssnext'),
                                    ];
                                },
                            },
                        },
                    ],
                }),
                include: /node_modules/,
            },
            {
                test: /\.png$/,
                exclude: /node_modules/,
                use: [
                    // 'url-loader?mimetype=image/png',
                    {
                        loader: 'url-loader',
                        options: {
                            mimetype: 'image/png',
                        },
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            query: {
                                progressive: true,
                                interlaced: true,
                                optimizationLevel: 7,
                                pngquant: {
                                    quality: '65-90',
                                    speed: 4,
                                },
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(woff|eot|ttf|svg)\??.*$/,
                exclude: /node_modules/,
                include: [
                    getPath('../modules/Icon/fonts'),
                ],
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: './resources/fonts/[name].[hash:base64:5].[ext]',
                        publicPath: ' ',
                    },
                }],
            },
        ]
    },

    resolve: {
        extensions: ['.js', '.jsx']
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"',
        }),
        new ExtractTextPlugin({
            filename: 'comm100-react-components.css',
            allChunks: true,
        }),
        new webpack.SourceMapDevToolPlugin({
            filename: '[file].map',
            append: `\n//# sourceMappingURL=http://localhost:8000/[url]`,
        }),
    ]
}