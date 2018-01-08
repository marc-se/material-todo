module.exports = {
	entry: './app/App.js',
	output: {
		filename: 'public/bundle.js',
	},
	devServer: {
		inline: true,
		port: 3000,
		stats: {
			chunks: false,
		},
	},
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
