/**
 * pocketcheck controller
 * @return
 */
module.exports = Controller("Home/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self= this;
            var api_url= zyoAPI.medical_tool;
            request(api_url, function(error, response, body){
                var res= JSON.parse(body)
                console.log('medical_list',res.data)
                self.assign('medicallistdata', JSON.stringify(res.data.medicalToolList))
                self.display('');
            });
        },
    };
});