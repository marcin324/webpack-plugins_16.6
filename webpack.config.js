const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeJsPlugin = require('optimize-js-plugin');

const plugins = [new HtmlWebpackPlugin ({
	  				template: 'src/index.html',
	  				filename: 'index.html',
	  				inject: 'body'
				})];


module.exports = (env) => {
	
	if(env === 'production'){
		plugins.push(
			new OptimizeJsPlugin ({
				sourceMap: false
			})
		)
	}

	const environment = env || 'production';

	return {
		mode: environment,
		entry: './src/index.js',
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: 'app.bundle.js'
		},

		module : {
			rules: [
				{
				    test: /\.js$/,
				    loader: "babel-loader"
				},
				    
				{
				    test: /\.css$/,
				    use: [
				        {
				           	loader: 'style-loader'
				        },
				        {
				            loader: 'css-loader',
				            options: {
				                modules: true
				            }
				        }
				    ]
				}
			]
		},

		plugins // notacja skrócona, zgodnie ze składnią ES6; to samo co - plugins: plugins
	}
};