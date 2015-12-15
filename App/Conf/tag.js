/**
 * 系统标签配置
 * 可以在 App/Conf/tag.js 里进行修改
 * @type {Object}
 */
module.exports = {
  // 应用初始化
  app_init: function(){
    console.log(333)
  },//[],
  //pathinfo 解析
  path_info: [],
  // 静态资源请求检测
  resource_check: ["CheckResource"],
  // 路由检测
  route_check: ["CheckRoute"],
  // 应用开始
  app_begin: function(){
    console.log(123)
  },//["ReadHtmlCache"],
  //action 执行初始化
  action_init: [],
  // 模版解析初始化
  view_init: [],
  // 定位模版文件
  view_template: ["LocationTemplate"],
  // 模版解析
  view_parse: ["ParseTemplate"],
  // 模版内容过滤
  view_filter: [],
  // 模版解析结束
  view_end: ["WriteHtmlCache"],
  //action 结束
  action_end: [],
  // 应用结束
  app_end: []
};