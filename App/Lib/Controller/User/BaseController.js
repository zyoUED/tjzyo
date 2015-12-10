/**
 * 项目里的Controller基类
 * 这里做一些通用的处理逻辑，其他Controller继承该类
 * @param  {[type]} 
 * @return {[type]}         [description]
 */
module.exports = Controller(function(){
    'use strict';
    return {
        init: function(http){
            var self= this;
            self.super("init", http);
//            var deferred = new Promise(sessionController(self, function(){
//            sessionController(self, function(){
                console.log('user base')
//            })
//            return self.initComplete = deferred;
        },
    }
})