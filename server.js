let webpack = require('webpack');
let WebpackDevServer = require('webpack-dev-server');

const CONFIG = require('./webpack.config');

let server = new WebpackDevServer(webpack(CONFIG),{
	publicPath:CONFIG.output.publicPath,
	progress:true,
	stats:{
		colors:true
	}
});

server.app.get('*',function(req,res,next){
	res.sendFile(__dirname,'/index.html')
});
server.listen(4000,function(){
	console.log('server runing at port :4000 ')
})