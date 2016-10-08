module.exports = require('./config/webpack.prod.js');


// var webpack = require('webpack');
// var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var htmlWebpackPlugin = require('html-webpack-plugin');

// module.exports = {
// 	devtool: 'cheap-module-eval-source-map',

// 	debug: true,
	
// 	entry: {
// 		vendor: './vendor.ts',
// 		main: './main.ts'
// 	},
// 	output: {
// 		path: './dist',
// 		publicPath: 'http://localhost:8080/',
// 		filename: '[name].bundle.js',
// 		chunkFileName: '[id].chunk.js'
// 	},
// 	resolve: {
// 		extensions: ['', '.js', '.ts']
// 	},
// 	module: {
// 		loaders: [{
// 			test: /\.ts$/,
// 			loaders: ['awesome-typescript-loader', 'angular2-template-loader']
// 		},
// 		{
// 			test: /\.css$/,
// 			loader: 'style-loader!css-loader'
// 		},
// 		{
//         	test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
//         	loader: 'file?name=assets/[name].[hash].[ext]'
//       	},
// 		{
// 			test: /\.html$/,
// 			loader: 'html-loader'
// 		}]
// 	},
// 	plugins: [
// 		new webpack.optimize.CommonsChunkPlugin({
// 			name: ['main', 'vendor']
// 		}),
// 		new htmlWebpackPlugin({
// 			template: 'src/index.html'
// 		}),
// 		new ExtractTextPlugin('[name].css')
// 	],
// 	devServer: {
// 		historyApiFallback: true,
// 		stats: 'minimal'
// 	}
// };