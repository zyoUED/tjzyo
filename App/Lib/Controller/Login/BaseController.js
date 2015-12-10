/**
 * 项目里的Controller基类
 * 这里做一些通用的处理逻辑，其他Controller继承该类
 * @param  {[type]} 
 * @return {[type]}         [description]
 */
module.exports = Controller({
	// 'use strict'
	__before: function(){
		return this.checkUserLogin();
	},
	checkUserLogin: function(){
		var self= this;
		console.log(this.session())
		if(this.http.action== 'index'){
			return //self.success(400, 'logined~');
		}
		return this.session('userInfo').then(function(data){
			if(isEmpty(data)){
				if(self.isAjax()){
					return self.error(403, 'Not Login~');
				}
				return self.redirect('/login')
			}
			return self.assign('userInfo', data);
		})
	}
})