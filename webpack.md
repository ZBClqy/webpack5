# webpack5打包手册

## 一、依赖的安装

html-webpack-plugin

可以为我们自动生成一个html自动引入我们打包好的文件，并且我们可以配置让他将我们需要原本配置好的html文件内容复制到他新生成的文件中

css-loader

帮助我们处理引入的css文件的loader

vue-style-loader

帮助我们处理引入的vue文件的loader

less

帮助我们解析less预编译样式

less-loader

帮助我们处理引入的less文件的loader

sass

帮助我们解析sass预编译样式

sass-loader

帮助我们处理引入的sass文件的loader

webpack-dev-server

在生产模式我们需要一个本地服务器去跑我们的代码webpack-dev-server可以帮助我们

eslint-webpack-plugin

帮助我们处理eslint配置的plugin

copy-webpack-plugin

帮助我们处理初html外的一些静态引入需要一起打包带走的文件

webpack

要用webpack 首先我们要引入我们的webpack

webpack-cli

这也是使用webpack要引入的cli

webpack-merge

用于合并我们的webpack配置

我们都知道css可能会因为浏览器去各种的不兼容，下面三行代码用于处理

postcss

postcss-loader

postcss-preset-env

babel-loader

用于处理js兼容问题的loader

vue-loader

用于处理vue文件的loader

css-minimizer-webpack-plugin

帮助我们去压缩我们的css文件

mini-css-extract-plugin

这个插件帮助我们去单独提取出我们的css文件

terser-webpack-plugin

用于帮助我们开启多线程更快的去打包我们的代码

下面6个插件用于帮助我们去无损伤的压缩我们的图片,这6个插件需要使用cnpm来去安装

image-minimizer-webpack-plugin

imagemin

imagemin-gifsicle

imagemin-jpegtran

imagemin-optipng

imagemin-svgo

cross-env

用于帮助我们去配置我们的环境变量

## 二、配置package.json

dev：corss-env BABEL_ENV=development webpack server --config build/build.js

build：corss-env BABEL_ENV=production webpack --config build/build.js

##  三、目录结构

build 文件夹

-- build.js 入口文件

-- webpack.base.config.js 公共配置文件

-- webpack.dev.config.js 开发模式的配置文件

-- webpack.pro.config.js 生产模式的配置文件