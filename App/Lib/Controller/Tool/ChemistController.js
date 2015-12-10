/**
 * chemist controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self= this;
//            console.log('session:\n',self.http.cookie)
//            if(self.http.query.drugId){
                var api_url= zyoAPI.chemist_list+ '&city='+(self.http.cookie.usercity||encodeURI('上海'))+'&start=0&rows=10&lat='+(self.http.cookie.userlat||31.313131)+'&lng='+(self.http.cookie.userlng||121.121121)+'&uid=';
                request(api_url, function(error, response, body){
                    console.log('api_url:\n',api_url)
                    var res= JSON.parse(body);
                    self.assign('storeEmployeeList', JSON.stringify(res.data.storeEmployeeList))
                    self.display();
                })
//            }
//            else{
//                
//            }
        },
        detailAction: function(){
            var self= this;
            var uid= self.view.tVar.userInfo? JSON.parse(self.view.tVar.userInfo).uid: '';
            console.log('session:\n',uid)
            var api_url= zyoAPI.chemist_detail+'&uid='+self.http.query.chemistId+ '&userId='+ uid;
            console.log(api_url)
            request(api_url, function(error, response, body){
                var res= JSON.parse(body)
                self.assign('employeeInfo', JSON.stringify(res.data.employeeInfo))
                self.display('');
            });
        },
        collectAction: function(){
            var self= this, uid;
            (self.view.tVar.userInfo)&& (uid= JSON.parse(self.view.tVar.userInfo).uid);
            console.log('like session:\n',uid);
            if(!uid){
                console.log('redirect')
                self.end('{"code":"7", "msg":"未登录", "data":"unlogin"}')
            }
            else {
                var api_url= zyoAPI.chemist_focus+'&uid='+self.http.query.dataId+'&userId='+uid;
                request(api_url, function(error, response, body){
                    var res= JSON.parse(body)
                    console.log(api_url,'\n')
                    self.end(body)
                })
            }
        },
        uncollectAction: function(){
            var self= this, uid= '';
            (self.view.tVar.userInfo)&& (uid= JSON.parse(self.view.tVar.userInfo).uid);
            if(!uid){
                console.log('redirect')
                self.end('{"code":"7", "msg":"未登录", "data":"unlogin"}')
            }
            else {
                var api_url= zyoAPI.chemist_cancel_focus+'&uid='+self.http.query.dataId+'&userId='+uid;
                console.log(api_url,'\n')
                request(api_url, function(error, response, body){
                    var res= JSON.parse(body)
                    self.end(body)
                })
            }
        },
    };
});