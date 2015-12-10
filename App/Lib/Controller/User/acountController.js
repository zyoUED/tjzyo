/**
 * Register controller
 * @return 
 */
module.exports = Controller("User/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self= this;
            self.display('');
        },
    };
});