/**
 * message controller
 * @return 
 */
module.exports = Controller("Message/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self= this;
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
                            'uid': uid,
                            'username': res.data.userInfo.userName,
                            'useravatar': res.data.userInfo.avatar
                        });
                        self.display();
                    });
                }
            });
            //endof获取用户信息
        },
        //msg_ajax
        ajaxAction: function(){
            var self= this;
            if(self.isGet()){
                var api_url= zyoAPI.store_home+'&city='+encodeURI(self.get('city'))+'&lat='+self.get('lat')+'&lng='+self.get('lng');
                console.log(api_url,'\n');
                request(api_url, function(error, response, body){
                    if(!error){
                        self.end(body);
                    }
                })
            }
            else{
                self.end(self.redirect('/'))
            }
        },
        //msg_404
        _404Action: function(){
            this.status(404); //发送404状态码
            this.end('not found');
        },
    };
});