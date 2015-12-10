module.exports = Controller("Home/BaseController", function(){
    //"use strict";
    return {
        indexAction: function(){
            var self= this;
            self.session()
            console.log('referer:\n', self.http.cookie.http_referer)
            self.session('http_referer', self.http.cookie.http_referer)
//            if(self.session('userInfo')){
//                self.redirect(self.http.cookie.http_referer)
//            }
//            else{
                //render View/Home/index_index.html file
                self.display();
//            }
        },
        loginAction:function(){
        	var self = this;
        	var username = this.post('username');
        	var pwd = this.post('password');
			var md5_pwd = md5(pwd);
            console.log('type:'+typeof(pwd));
			var api_url= zyoAPI.user_login+ '&userName='+ username+'&passWord='+ md5_pwd;
			//登陆
            //console.log(username+'->'+pwd);
            console.log("api url:\n"+api_url);

            request(api_url, function(error, response, body){
                //console.log(JSON.parse(body))
                console.log(error);
                //console.log("api url:\n"+api_url);
                if(!error){
                    var res = JSON.parse(body);
                    console.log(res);
                    if (res.code== 0) {
                    	//获取用户信息
                    	var uid= res.data.userInfo.uid;
                    	var api_url = zyoAPI.user_info+"&uid="+uid;
                    	console.log("api_url:\n"+api_url);
                    	request(api_url, function( error, response, body){
                    		var res = JSON.parse(body);
                    		res.data.userInfo.uid= uid;
							//存入cookie
							self.session("userInfo", JSON.stringify(res.data)).then(function(){
                                console.log('referer:\n', self.http.cookie.http_referer)
                                self.end(res)
    						});
                    	});
                    	//endof获取用户信息
                    }else{//res.code!= 0
                    	console.log('login error');
                        self.end(res);
//                    	self.redirect('/login');
                    };
                }
            });
        },
        ajaxAction: function(){
            this.display();
        },
        _404Action: function(){
            this.status(404); //发送404状态码
            this.end('not found');
        }
    };
});