var path = require('path');
var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
	entry: './app/App.js',
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devServer: {
		inline: true,
		port: 3000,
		stats: {
			chunks: false,
		},
	},
	plugins: [
		new webpack.optimize.DedupePlugin(),
		new webpack.NoErrorsPlugin(),
		new CompressionPlugin({
			asset: '[path].gz[query]',
			algorithm: 'gzip',
			test: /\.js$|\.css$|\.html$/,
			threshold: 10240,
			minRatio: 0,
		}),
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false,
				pure_getters: true,
				unsafe: true,
				unsafe_comps: true,
				screw_ie8: true,
			},
			output: {
				comments: false,
			},
			exclude: [ /\.min\.js$/gi ], // skip pre-minified libs
		}),
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel',
				query: {
					presets: [ 'react', 'es2015', 'stage-2' ],
				},
			},
		],
	},
};
