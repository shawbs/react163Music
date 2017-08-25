let path = require('path');
let webpack = require('webpack');
let ExtractTextPlugin = require('extract-text-webpack-plugin'); //css单独打包
let HtmlWebpackPlugin = require('html-webpack-plugin'); //生成html



//开发目录
let DEV_PATH = path.resolve(__dirname,'src');
//生产目录
let BUILD_PATH = path.resolve(__dirname,'build');

module.exports = {
  entry: {
  	app:DEV_PATH + '/index'
  },
  output: {
  	publicPath:'/build/',
  	path: BUILD_PATH,
    filename: '[name].js',
    chunkFilename: '[name].[chunkhash:5].min.js'
  },
  devtool:'cheap-module-eval-source-map',
  module:{
  	loaders:[
  		{
  			test:/\.js$/,
  			exclude:/^node_modules$/,
  			loader:'babel',
  			include:[DEV_PATH]
  		},
  		{
  			test: /\.jsx$/,
            exclude: /^node_modules$/,
            loaders: ['jsx', 'babel'],
            include: [DEV_PATH]
  		},
  		{
  			test:/\.css$/,
  			exclude:/^node_modules$/,
  			loader:ExtractTextPlugin.extract('style',['css','autoprefixer']),
  			include:[DEV_PATH]
  		},
  		{
  			test:/\.scss$/,
  			exclude:/^node_modules$/,
  			loader:ExtractTextPlugin.extract('style','css!sass'),
  			include:[DEV_PATH]
  		},
  		{
  			test:/\.(eot|woff|svg|ttf|woff2|gif|appcache)(\?|$)/,
  			exclude:/^node_modules$/,
  			loader:'file-loader?name=[name].[ext]',
  			include:[DEV_PATH]
  		},{
  			test: /\.(png|jpg|gif)$/,
            exclude: /^node_modules$/,
            loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]',
            //注意后面那个limit的参数，当你图片大小小于这个限制的时候，会自动启用base64编码图片
            include: [DEV_PATH]
  		}
  	]
  },
  plugins:[
  	new webpack.DefinePlugin({
  		'process.env':{
  			NODE_ENV:JSON.stringify('development')	//定义编译环境
  		}
  	}),
  	new HtmlWebpackPlugin({  //根据模板插入css/js等生成最终HTML
	    filename: '../index.html', //生成的html存放路径，相对于 path
	    template: 'index.html', //html模板路径
	    hash: true,
	}),
	new ExtractTextPlugin('[name].css'),
	//提取出来的样式和common.js会自动添加进发布模式的html文件中，原来的html没有
  ],
  resolve:{
  	extensions:['','.js','.jsx','.scss','.css'], //后缀名自动补全
  	alias:{
        'component': DEV_PATH + '/component',
        'style': DEV_PATH + '/style',

  	}
  }

};