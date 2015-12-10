/**
 * user controller
 * @return 
 */
module.exports = Controller("User/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self= this;
            sessionController(self, function(){
                console.log('cookie:\n', self.http.cookie)
                console.log('user index')
                return self.display();
            })
        },
        editinfoAction: function(){
            var self= this;
            console.log('edit:', self.http.cookie.userid)
            if(!!self.http.cookie.userid){
                var api_url = zyoAPI.user_detail+"&uid="+JSON.parse(self.http.cookie.userid);
                request(api_url, function(error, response, body){
                    console.log(api_url)
                    var res= JSON.parse(body)
                    if(res.code== 0){
                        self.end(res)
                    }
                })
            }
            else{
                self.end({"code":"1", "msg":"unlogin"})
            }
        },
        saveinfoAction: function(){
            var self= this;
            console.log('save:', self.http.cookie.userid)
            if(!!self.http.cookie.userid){
                //&uid=883270&userName=小姚&birthday=1999-09-09&city=上海&gender=1
                var api_url = zyoAPI.user_detail_save+"&uid="+JSON.parse(self.http.cookie.userid)+'&userName='+self.http.query.userName+'&birthday='+self.http.query.birthday+'&city='+self.http.query.city+'&gender='+self.http.query.gender;
                console.log(api_url)
                request(api_url, function(error, response, body){
                    var res= JSON.parse(body)
                    console.log(res)
                    if(res.code== 0){
                        self.end(res)
                    }
                })
            }
            else{
                self.end({"code":"1", "msg":"unlogin"})
            }
        },
    };
});