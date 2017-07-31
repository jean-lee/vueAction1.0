// https://github.com/shelljs/shelljs
require('shelljs/global') //依赖。shelljs库提供API，可在nodejs中提供一些常用的shell命令
env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora') //用于给长时间执行的异步任务的提示(转圈图案，文字)
var webpack = require('webpack')
var webpackConfig = require('./webpack.prod.conf')

console.log( //打包结果提示
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...') //打包过程(异步)中的提示文案
spinner.start() //

var assetsPath = path.join(config.build.assetsRoot, config.build.assetsSubDirectory) //讲当前static目录下的所有文件拷贝到dist下的static
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
cp('-R', 'static/', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop() //打包结束
  if (err) throw err
  process.stdout.write(stats.toString({ //打包信息及结果
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
