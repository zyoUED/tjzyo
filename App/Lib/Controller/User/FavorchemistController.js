/**
 * Register controller
 * @return 
 */
module.exports = Controller("User/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self= this;
            sessionController(self, function(){
                if(!!self.http.cookie.userid){
                    var api_url= zyoAPI.my_focus_chemist+'&uid='+ self.http.cookie.userid;
                    request(api_url, function(error, response, body){
                        console.log(api_url);
                        var res= JSON.parse(body);
                        if(res.code== 0){
                            self.assign('focusList', JSON.stringify(res.data.focusList))
                            self.display('');
                        }
                        else{
                            self.assign('focusList', '[]')
                            self.display('');
                        }
                    });
                }
                else{
                    self.redirect('/login')
                }
            })
        },
    };
});