/**
 * 项目里的Controller基类
 * 这里做一些通用的处理逻辑，其他Controller继承该类
 * @param  {[type]} 
 * @return {[type]}         [description]
 */
module.exports = Controller(function(){
    'use strict';
    return {
        __before: function(action){
            console.log('beforeAct:', action)
        },
        init: function(http){
            this.super("init", http);
            //其他的通用逻辑
            sessionController(this, function(){
                console.log('home base')
            })
        },
        //home_404
        _404Action: function(){
            this.status(404); //发送404状态码
            this.end('not found');
        },
        checkUserLogin: function(){
            var self= this;
            self.session("userInfo").then(function(user){
                console.log('baseCtrl checkUserLogin user:\n',user);
                return self.session("userInfo").then(function(user){
                    if(isEmpty(user)){//无用户数据
                        console.log("nologin\n");
                        self.assign({
                            'logined':false,//是否登录
                            'nologin':true,//是否未登录
                            'userInfo':{},
                            'uid':'',
                            'username':'',
                            'useravatar':''
                        });
                    }
                    else{
                        console.log("home base logined\n", user);
                        //获取用户信息
                        var uid= self.http.cookie.userid;
                        var api_url = zyoAPI.user_info+"&uid="+uid;
                        console.log("api_url:\n"+api_url);
                        request(api_url, function( error, response, body){
                            console.log(api_url)
                            if(!error){
                                var res = JSON.parse(body);
                                console.log(res)
                                //存入session
                                self.session("userInfo", JSON.stringify(res.data)).then(function(){
                                    console.log('referer:\n', self.http.cookie.http_referer)
                                    self.assign({
                                        'logined': true,//是否登录
                                        'nologin': false,//是否未登录
                                        'userInfo': res.data,
                                        'uid': res.data.userInfo.uid,
                                        'username': res.data.userInfo.userName,
                                        'useravatar': res.data.userInfo.avatar
                                    });
                                });
                            }
                        });
                        //endof获取用户信息
                    }
                })
            })
        }
    }
})