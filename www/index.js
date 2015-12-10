var path = require('path');
//定义APP的根目录
global.APP_PATH = path.dirname(__dirname) + '/App';
//静态资源根目录
global.RESOURCE_PATH = __dirname;
//网站根目录
global.ROOT_PATH = __dirname;
//开启调试模式，线上环境需要关闭调试功能
global.APP_DEBUG = true;
//加载thinkjs启动服务
require('thinkjs');
//加载request模块
global.request= require('request');
//global.ApiCore= require(global.RESOURCE_PATH+'/resource/js/zyo-api-url.js');
module.exports= global;
