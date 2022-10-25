//这是我们的公共配置文件我们在下面配置我们的公共配置

const path=require('path')
//导入我们node的path api去配置我们的路径
const HtmlWebpackPlugin=require('html-webpack-plugin')
//导入html-webpack-plugin插件去配置我们的html
const { VueLoaderPlugin }=require('vue-loader')
//将我们vue-loader中的VueLoaderPlugin取出配置才能是我们的webpack去使用vue-loader
const EslintWebpackPlugin=require('eslint-webpack-plugin')
//导入eslint-webpack-plugin插件去读取我们的eslint配置
const { DefinePlugin }=require('webpack')
//将我们的DefinePlugin导出在我们的编译时去创建我们的全局变量
const CopyWebpack=require('copy-webpack-plugin')
//去复制我们html引入的静态文件

//书写方法去配置我们样式的loader
const exportTheStyle=(loader)=>{
    return [
        'vue-style-loader',
        'css-loader',
        {
            loader:'postcss-loader',
            options:{
                postcssOptions:{
                    plugins:['postcss-preset-env']
                }
            }
        },
        loader
    ].filter(Boolean)
}

module.exports={
    //配置我们的入口文件
    entry:'./src/main.js',
    //配置我们的出口
    output:{
        //出口目录
        path:path.resolve(__dirname,'../dist'),
        //出口文件名记得加上[contenthash:10]这样每次当我们修改完上线后才不会因为缓存读取不到我们更新后的代码
        filename:'static/js/[name].[contenthash:10]js',
        //我们将我们懒加载资源进行单独的文件打包这里也使用[contenthash:10]
        chunkFilename:'static/js/[name].[contenthash:10].chunk.js',
        //通过assetModuleFilename将我们使用到type:asset的loader文件打包到配置的目录下并用我们的配置进行文件命名
        assetModuleFilename:'static/media/[hash:8][ext][query]',
        //我们开启打包后删除原理打包的代码
        clean:true
    },
    //配置我们的loader
    module:{
        //loader需要配置在我们的rules内
        rules:[
                //配置css
                    {
                        test:/\.css$/,
                        use:exportTheStyle()
                    },
                //配置less
                    {
                        test:/\.less$/,
                        use:exportTheStyle('less-loader')
                    },
                //配置sass
                    {
                        test:/\.s[ac]ss$/,
                        use:exportTheStyle('sass-loader')
                    },
                //配置我们的图片
                    {
                        test:/\.(gif|png|jpe?g|svg)$/,
                        type:'asset',
                        //这里配置让我们小于10k的文件可以变成base64编码更快的加载
                        parser:{
                            dataUrlCondition:{
                                maxSize:10*1024
                            }
                        }
                    },
                //配置其他文件
                    {
                        test:/\.(ttf|webp|mp3|mp4|avi)$/,
                        type:'asset/resource'
                    },
                //配置js
                    {
                        test:/\.js$/,
                        //这里配置我们只加载我们的src文件夹下的内容
                        include:path.resolve(__dirname,'../src'),
                        //使用我们的loader这样就可以配置我们的options配置
                        loader:'babel-loader',
                        //我们在options中去开启我们的缓存这样没有修改过的文件不需要去重新加载读取缓存即可
                        options:{
                            cacheDirectory:true,
                            cacheCompression:false
                        }
                    },
                //配置vue
                    {
                        test:/\.vue$/,
                        loader:'vue-loader',
                        //这里也在options中去配置了我们的缓存，并且配置了我们的缓存文件
                        options:{
                            cacheDirectory:path.resolve(__dirname,'../node_modules/.cache/.vuecache')
                        }
                    }
                ]
    },
    //配置插件
    plugins:[
        //这里配置了我们的html-webpack-plugin插件
        new HtmlWebpackPlugin({
            //使用template指出我们需要的模板文件
            template:path.resolve(__dirname,'../public/index.html')
        }),
        //这里配置了我们的eslint-webpack-plugin插件
        new EslintWebpackPlugin({
            //这里指出了我们eslint主要检测的目录
            context:path.resolve(__dirname,'../src'),
            //这里指出我们不需要eslint检测的目录
            exclude:path.resolve(__dirname,'../node_modules'),
            //开启缓存
            cache:true,
            //配置我们的缓存放置的文件
            cacheLocation:path.resolve(__dirname,'../node_modules/.cache/.eslintcache')
        }),
        //我们要使用vue-loader就要使用我们的VueLoaderPlugin插件
        new VueLoaderPlugin(),
        //使用DefinePlugin去配置我们编译时所需要生成的全局变量
        new DefinePlugin({
            __VUE_OPTIONS_API__: "true",
            __VUE_PROD_DEVTOOLS__: "false",
        }),
        //配置我们的copy-webpack-plugin
        new CopyWebpack({
            //我们需要将配置配置到我们的patterns数组中
            patterns:[
                //用对象的形式
                {
                    //我们想要从那个文件
                    from:path.resolve(__dirname,'../public'),
                    //我们想去那个文件
                    to:path.resolve(__dirname,'../dist'),
                    //开启我们的错误提示
                    noErrorOnMissing:true,
                    //配置我们忽略的文件
                    globOptions:{
                        ignore:['**/index.html']
                    },
                    //配置我们的复制格式dir为文件
                    toType:'dir',
                    //配置压缩
                    info:{
                        minimized:true
                    }
                }
            ]
        })
    ],
    //配置我们的优化
    optimization:{
        //配置splitChunks去将我们重复使用的代码单独打包出来
        splitChunks:{
            chunks:'all'
        },
        //这里配置我们[contenthash:10]的时候可能相互直接的依赖导致改变一个文件其他文件都变
        //我们配置将其依赖单独放置一个文件中
        runtimeChunk:{
            name:(entrypoint)=>`runtime~${entrypoint.name}`
        }
    },
    //配置我们的解析
    resolve:{
        //这里配置几个后缀名保证我们使用这几个后缀文件时不用去输入后缀
        extensions:['.vue','.js','.json'],
        //这里配置我们的文件位置快捷方式，我们这里配置了一个@符号代表src目录
        alias:{
            '@':path.resolve(__dirname,'../src')
        }
    }
}