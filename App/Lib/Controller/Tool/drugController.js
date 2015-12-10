/**
 * drug controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self= this;
            var api_url= zyoAPI.drugclassify;
            request(api_url, function(error, response, body){
                var res= JSON.parse(body);
                self.assign('classifyList', JSON.stringify(res.data.classifyList))
                self.display();
            })
        },
        listAction: function(){
            var self= this;
            var api_url= zyoAPI.moredrug_symptom+ '&symptomId='+self.http.query.symptomId;
            request(api_url, function(error, response, body){
                var res= JSON.parse(body);
                console.log(res.data.drugList)
                self.assign('drugList', JSON.stringify(res.data.drugList))
                self.display();
            })
        }
    }
})