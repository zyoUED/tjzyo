/* name: tabChanger
/* @params: nodes' className
/* @return: 
/* @author: cdll
/*/
define(function (require, exports, module) {
  exports.tabChanger= function(className){
    var tabs= document.getElementsByClassName(className);
    console.log(tabs);
    return tabs;
  };
});