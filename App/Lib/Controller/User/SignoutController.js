/**
 * signout controller
 * @return 
 */
module.exports = Controller("User/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var self= this;
//            sessionController(self, function(){
                self.session().then(function(){
                    console.log(11)
                    self.redirect('/user')
                    console.log(22)
                });
//            })
        },
    };
});