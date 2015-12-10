/**
 * HOME controller
 * @return 
 */
module.exports = Controller("Home/BaseController", function(){
    "use strict";
    return {
        indexAction: function(){
            var api_url= 'http://api.lkhealth.net/index.php?r=employee/employeeInfo&uid=1008243&userId=1&uid=1008243&userId=1';
            request(api_url, function(error, response, body){
                if(!error){
                    console.log("body:\n", body)
                }
            })
            //render View/Home/index_index.html file
            this.display();
        },
        mainAction: function(){
            this.display();
        }
    };
});