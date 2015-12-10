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
            this.super("init", http);
            var self= this;
            sessionController(self, function(){
                console.log('msg base')
            })
        },
    }
})