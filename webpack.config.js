var webpack = require('webpack');
var path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var BabelPolyfill = require("babel-polyfill");

module.exports = {

	entry: {
		index: './src/',
	},

	output: {
		path: __dirname + "/dist/",
		filename: "[name].bundle.js",
	},

	plugins: [
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compressor: {
				warnings: false,
			}
		}),
		new webpack.LoaderOptionsPlugin({
			test: /\.styl$/,
			minimize: true,
			debug: false
		}),
		new ExtractTextPlugin({
			filename: "[name].css",
			disable: false,
			allChunks: true
		}),
		new CleanWebpackPlugin(['dist'], {
			root: __dirname,
			verbose: true,
			dry: false,
		})
	],

	module: {
		rules: [
			{ test: /vux.src.*?js$/, loader: 'babel'},
			{ test: /\.vue$/, loader: 'vue-loader' },
			{ test: /\.styl$/, loader: ExtractTextPlugin.extract({
				fallbackLoader: "style-loader",
				loader: "css-loader!stylus-loader"
			}) },
			{ test: /\.css$/, loader: ExtractTextPlugin.extract({
				fallbackLoader: "style-loader",
				loader: "css-loader"
			}) },
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
			},
			{ test: /\.json$/, loader: 'json', include: [/node_modules/] },
		]
	},

	resolve: {
		alias: {
			vue: 'vue/dist/vue.js',
		},
		extensions: ['.js', '.jsx', '.styl', '.css', '.vue']
	}
}