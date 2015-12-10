/**
 * download controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self= this;
            self.display();
        }
    }
})