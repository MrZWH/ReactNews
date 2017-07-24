var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname),
    devtool: debug ? "inline-sourcemap" : null,
    entry: "./src/js/root.js",
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'es2015'],
                        plugins: [["import", { "libraryName": "antd", "style": "css" }]]
                    }
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /.less$/,
                use: [{
                    loader: "style-loader" 
                }, {
                    loader: "css-loader"
                }, {
                    loader: "less-loader" 
                }]
            }
        ]
    },

    output: {
        path: __dirname,
        filename: "./src/bundle.js"
    },

    plugins: debug ? [
        new webpack.HotModuleReplacementPlugin(),
    ] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false}),
    ],

    devServer: {
        contentBase: './',
        historyApiFallback: true,
        inline: true,
        hot: true,
    },
}