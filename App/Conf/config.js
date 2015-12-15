//console.log(process.env.IP, process.env.PORT)
module.exports = {
  //配置项: 配置值
  port: process.env.PORT||8360, //监听的端口
  db_type: 'mysql', // 数据库类型
  db_host: process.env.IP||'127.0.0.1', // 服务器地址
  db_port: '', // 端口
  db_name: '', // 数据库名
  db_user: 'root', // 用户名
  db_pwd: '', // 密码
  db_prefix: 'think_', // 数据库表前缀
//    use_proxy: true, //是否使用代理访问，如：nginx。开启后不能通过ip+端口直接访问
    /*空控制器
    /*表示当访问一个不存在的控制器时，会执行Home分组下IndexController下的_404Action方法
    /*如果指定的控制器或者方法不存在，则会报错
    */
  call_controller: "Home:Index:_404",

  // session
  session_name: "zyinfo", //session对应的cookie名称
  session_type: "File", //session存储类型, 空为内存，还可以为Db
  session_path: "", //File类型下文件存储位置，默认为系统的tmp目录
  session_options: {}, //session对应的cookie选项
  session_sign: "", //session对应的cookie使用签名，如果使用签名，这里填对应的签名字符串
  session_timeout: 24 * 60 * 60, //session失效时间，单位：秒
};