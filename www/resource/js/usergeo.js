/* name: usergeo
/* @params: 
/* @return: 
/* @author: cdll
/*/
require(['Ajax', 'cookie'], function(){
  //根据ip获取所在城市
  Ajax('get', 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js&ip=', '', function(){
    setCookie('usercity', sessionStorage.usercity= remote_ip_info.city)
    sessionStorage.usercity= remote_ip_info.city;
//    document.title+= sessionStorage.usercity;
  }, 'script');
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function (poi){
      avalon.log('webgeo:'+ poi.coords.latitude+','+poi.coords.longitude)
//      sessionStorage.userlat= poi.coords.latitude;
//      sessionStorage.userlng= poi.coords.longitude;
      setCookie('userlat', poi.coords.latitude);
      setCookie('userlng', poi.coords.longitude);
      avalon.log('cookiegeo:', getCookie('userlat')+','+getCookie('userlng'))
    }, function (error){
      //error
      switch(error.code){
        case error.PERMISSION_DENIED:
          alert("浏览器拒绝了定位请求~");
//          alert("User denied the request for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          alert("GPS定位信息不可用~");
//          alert("Location information is unavailable.");
          break;
        case error.TIMEOUT:
          alert("定位超时了~");
//          alert("The request to get user location timed out.");
          break;
        case error.UNKNOWN_ERROR:
          alert("发生了未知的定位错误~");
//          alert("An unknown error occurred.");
          break;
      }//endof error
    })
  }
  else{
    alert('您的浏览器不支持GPS定位哦~')
//    alert('geolocation is not supported')
  }
})
