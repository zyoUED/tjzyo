/**
 * disease controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self= this;
//            var api_url= zyoAPI.drug_classify;
//            request(api_url, function(error, response, body){
//                console.log(api_url)
//                var res= JSON.parse(body);
//                if(res.code== 0){
//                    self.assign('classifyList', JSON.stringify(res.data.classifyList))
                    self.display();
//                }
//            })
        },
        listAction: function(){
            var self= this;
            var api_url= zyoAPI.moredrug_symptom+ '&symptomId='+self.http.query.symptomId;
            request(api_url, function(error, response, body){
                console.log(api_url)
                var res= JSON.parse(body);
                if(res.code== 0){
                    self.assign('drugList', JSON.stringify(res.data.drugList))
                    self.display();
                }
            })
        },
        detailAction: function(){
            var self= this;
            var api_url= zyoAPI.disease_main+ '&diseaseId='+(self.http.query.diseaseId|| 1)+'&lat=31.1485519424&lng=121.364367476&uid=';
            request(api_url, function(error, response, body){
                console.log(api_url)
                var res= JSON.parse(body);
            	if(res.code== 0){
	                self.assign('deseaseInfo', JSON.stringify(res.data.deseaseInfo))
	                self.assign('drugList', JSON.stringify(res.data.drugList))
	                self.assign('relationToolList', JSON.stringify(res.data.relationToolList))
	                self.assign('relationAdInfo', JSON.stringify(res.data.relationAdInfo))
	                self.assign('recommendArticleList', JSON.stringify(res.data.recommendArticleList))
	                self.assign('storeEmployeeList', JSON.stringify(res.data.storeEmployeeList))
	                self.display();
            	}
            })
        },
        infoAction: function(){
            var self= this;
            var api_url= zyoAPI.drug_detail+ '&drugId='+(self.http.query.drugId|| 1);
            request(api_url, function(error, response, body){
              console.log(api_url)
              var res= JSON.parse(body);
              if(res.code== 0){
                  self.assign('drugInfo', JSON.stringify(res.data.drugInfo))
                  self.display();
              }
            })
        },
    }
})