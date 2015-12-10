/**
 * common controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self= this;
            var uid= self.http.cookie.uid? self.http.cookie.uid: '';
            if(!!uid){
                self.redirect('/login')
            }
            else {
                if(self.isGet()){
                    var api_url= zyoAPI.common_disease+'&uid='+uid;
                    request(api_url, function(error, response, body){
                        var res= JSON.parse(body)
                        console.log('/tool/common\n',res+'\n',api_url);
                        self.assign('commonDiseaseList', JSON.stringify(res.data.commonDiseaseList));
                        self.display();
                    })
                }
            }
        },
    }
})