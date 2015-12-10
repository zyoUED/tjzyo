/**
 * HOME controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
    "use strict";
    return {
        //home_index
        indexAction: function(){
            var self= this;
            console.log('cookie:\n', self.http.cookie)
            console.log('address:\n', self.http.req.connection.remoteAddress)
            console.log('home index')
            var api_url= zyoAPI.store_home+'&city=%E5%8C%97%E4%BA%AC%E5%B8%82'+'&lat=31.313131'+'&lng=121.121121';
            request(api_url, function(error, response, body){
                console.log(api_url, '\n');
                if(!error){
                    var res= JSON.parse(body);
                    if(res.code== 0){
                        self.assign({
                            'data_relationAd': JSON.stringify(res.data.relationAd),
                            'data_storeEmployeeList': JSON.stringify(res.data.storeEmployeeList),
                            'data_operationAreaList1': JSON.stringify(res.data.operationAreaList1),
                            'data_operationAreaList2': JSON.stringify(res.data.operationAreaList2),
                            'data_operationAreaList3': JSON.stringify(res.data.operationAreaList3)
                        })
                        return self.display('');
                    }
                }
            })
        },
        //home_ajax
        ajaxAction: function(){
            var self= this;
            if(self.isGet()){
                var api_url= zyoAPI.store_home+'&city='+encodeURI(self.get('city'))+'&lat='+self.get('lat')+'&lng='+self.get('lng');
                request(api_url, function(error, response, body){
                    console.log(api_url);
                    var res= JSON.parse(body)
                    if(res.code== 0){
                        self.end(JSON.stringify(res));
                    }
                })
            }
            else{
                self.end(self.redirect('/'))
            }
        },
        //home_404
        _404Action: function(){
            this.status(404); //发送404状态码
            this.end('not found');
        },
    }
});