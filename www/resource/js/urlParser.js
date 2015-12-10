function urlParser(){
//    console.log(arguments);
    if(arguments[0]== 'p'){
        return getParams(arguments[1]);
    }
    else if(arguments.length== 1){
        return getParams(arguments[0]);
    }
    //获取参数
    function getParams(key){
        var params= location.search? location.search.split('?')[1].split('&'): {}
//        var params={};
        for(i in params){
            (!!params[i].match('='))&& (params[params[i].split('=')[0]]= params[i].split('=')[1]);
            console.log(params)
        }
        return params[key];
    }
    //获取哈希
    function getHash(){
        console.log('location.hash:', location.hash)
    }
}