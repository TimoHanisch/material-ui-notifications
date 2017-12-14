const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	entry: [
		path.join(__dirname, './src/index.js')
	],
	output: {
		path: path.join(__dirname, './dist'),
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				include: path.join(__dirname, 'src'),
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env', 'react', 'stage-1'],
					}
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new UglifyJSPlugin()
	],
	devtool: 'source-map'
};