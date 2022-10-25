//这里引入我们node的os模块
const os=require('os')
//引入我们的webpack-merge帮助我们合并代码
const { merge }=require('webpack-merge')
//引入我们的公共配置文件
const webpackBaseConfig=require('./webpack.base.config')
//引入我们的压缩css插件
const MiniCssExtractPlugin=require('mini-css-extract-plugin')
//引入我们的css单独打包成文件插件
const CssMinimizerWebpack=require('css-minimizer-webpack-plugin')
//引入开启多线程插件
const TerserPlugin=require('terser-webpack-plugin')
//引入压缩图片插件
const ImageMinimizerPlugin=require('image-minimizer-webpack-plugin')

//通过node的os模块返回我们的cpu线程数量
const threads=os.cpus().length;

//合并我们的配置
const webpackProConfig=merge(webpackBaseConfig,{
    //配置我们的css单独打包插件
    plugins:[
        new MiniCssExtractPlugin({
          //打包后的文件名称与位置
            filename:'static/css/[name].[contenthash:10].js',
          //预加载的css文件打包后的名称和位置
            chunkFilename:'static/css/[name].[contenthash:10].chunk.js'
        })
    ],
    //这里配置我们的优化
    optimization:{
    //下面配置压缩优化
     minimizer:[
        //配置css压缩优化插件
        new CssMinimizerWebpack(),
        //配置我们的多线程打包优化插件
        new TerserPlugin({
          //设置我们的线程数量
            parallel: threads, 
        }),
        //下面做出我们的图片无损压缩优化
        new ImageMinimizerPlugin({
            minimizer: {
              implementation: ImageMinimizerPlugin.imageminGenerate,
              options: {
                plugins: [
                  ["gifsicle", { interlaced: true }],
                  ["jpegtran", { progressive: true }],
                  ["optipng", { optimizationLevel: 5 }],
                  [
                    "svgo",
                    {
                      plugins: [
                        "preset-default",
                        "prefixIds",
                        {
                          name: "sortAttrs",
                          params: {
                            xmlnsOrder: "alphabetical",
                          },
                        },
                      ],
                    },
                  ],
                ],
              },
            },
          }),
     ]   
    },
    //这里指出是生产模式
    mode:'production',
    //下面的配置让我们可以知道生产模式的报错具体的位置
    devtool:'source-map'
})

module.exports=webpackProConfig