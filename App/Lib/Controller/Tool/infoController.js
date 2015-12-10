/**
 * info controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self= this;
            return self.display();
        },
        newsdetailAction: function(){
            var self= this;
            var api_url= zyoAPI.news_detail+ '&dataId=';
            request(api_url, function(error, response, body){
               if(!error){
//                    console.log("index_code:\n", JSON.parse(body).data);
                    var data= JSON.parse(body).data;
                    self.assign('index_data', body)
               } 
            });
            self.display();
        }
    };
});