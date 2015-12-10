/**
 * 项目里的Controller基类
 * 这里做一些通用的处理逻辑，其他Controller继承该类
 * @param  {[type]} 
 * @return {[type]}         [description]
 */
module.exports = Controller(function(){
  'use strict';
  return {
    init: function(http){
      this.super("init", http);
      //其他的通用逻辑
        var self= this;
        var deferred= getDefer();
        this.session("userInfo").then(function(user){
            // console.log('===='+info);
            if(isEmpty(user)){
                //无用户数据
                console.log("=====nologin");
                self.assign('logined',false); //是否登录
                self.assign('nologin',true);  //是否未登录
                self.assign('userInfo','');
                self.assign('uid','');
                self.assign('username','');
            }else{
                var user = JSON.parse(user);
                console.log("=====login");
                self.assign('userInfo',JSON.stringify(user.userInfo));
                self.assign('logined',true);
                self.assign('nologin',false);
                self.assign('username',isEmpty(user.userInfo.realName)?user.userInfo.userName:user.userInfo.realName);
                self.assign('uid',user.userInfo.uid);
            }
            deferred.resolve();
        });
        return deferred.promise;
    }
  }
})