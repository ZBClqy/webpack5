const webpackDevConfig=require('./webpack.dev.config')
//导入我们配置好的开发模式下的配置
const webpackProConfig=require('./webpack.pro.config')
//导入我们配置好的生产模式下的配置

//通过去判断我们的环境变量决定我们要输出哪一个配置
if(process.env.BABEL_ENV==='development'){
    module.exports= webpackDevConfig
}

if(process.env.BABEL_ENV==='production'){
    module.exports=webpackProConfig
}