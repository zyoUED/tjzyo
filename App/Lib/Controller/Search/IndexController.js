/**
 * search controller
 * @return 
 */
module.exports = Controller("Search/BaseController",function(){
	"use strict";
	return {
		indexAction:function(){
			var self = this;			
			this.display();
		},
		searchAction:function(){
			var self = this;
			var textstr = self.post('text');
			console.log(textstr);
			var api_url = zyoAPI.chemist_search+'&text='+textstr;			
			request(api_url,function(error,response,body){
				if(!error){
					self.end(JSON.stringify(body));
					/*console.log(api_url,JSON.parse(body));
					var res = JSON.parse(body);
					console.log(res.code);
					if(res.code ==0){
						console.log(123);
						self.end(JSON.stringify(res.data));
					}else if(res.code==7){
						self.end('暂无数据');
					}
					else{
						self.end(body)
					}*/			
				}else{
					self.end('暂无数据');
				}
			});
		}
	}
});