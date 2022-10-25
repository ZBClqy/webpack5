//首先导入我们的webpack-merge去
const { merge }=require('webpack-merge')
//然后导入我们的公共配置文件
const webpackBaseConfig=require('./webpack.base.config')
//最后将我们的公共配置和我们的开发模式独立的配置结合
const webpackDevConfig=merge(webpackBaseConfig,{
    //这里声明我们是开发模式
    mode:'development',
    //然后配置我们的本地服务
    devServer:{
        host:'localhost',
        port:3000,
        hot:true,
        open:true,
        //这里开启gizp压缩我们的文件
        compress:true,
        //这里配置我们在history刷新的404跳转回首页
        historyApiFallback:true
    },
    //我们打包后的代码不好找报错配置如下配置可以帮我们映射到打包前的代码去找错误
    devtool:"cheap-module-source-map"
})

module.exports=webpackDevConfig