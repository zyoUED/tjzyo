/**
 * store controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self= this;
//            console.log(self.http.session)
            var api_url= zyoAPI.store_list+'&lat=31.3166130000&lng=120.5807360000&sort=1&city=%E8%8B%8F%E5%B7%9E&rows=99';
            request(api_url, function(error, response, body){
                var res= JSON.parse(body)
                console.log('store_list',res.data)
                self.assign('storelistdata', JSON.stringify(res.data.storeInfoList))
                self.display('');
            });
        },
    };
});