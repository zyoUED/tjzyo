require(['jquery'], function($){
    require(['imStrophe'], function(){
        require(['imEasymob', 'json2', 'cookie', 'MD5'], function(){
            if(!!getCookie('userid')&& getCookie('zyinfo')){
                var conn = null;
                var client_id= 'YXA6rsCHwDRBEeWxG5slXnHJ1g'
                var client_secret= 'YXA6k3Afx5mVlM9q5iCAWkLpUfNn_Cc'
                console.info('ckuid:', getCookie('userid'))
                conn = new Easemob.im.Connection();
                window.conn= conn;
                conn.init({
                    url : '',//非必填，默认聊天服务器地址，
                    domain : '',//非必填，默认:‘easemob.com’
                    wait : '60',//非必填，连接超时，默认:60，单位seconds
                    onOpened : function() {//当连接成功时的回调方法
                        handleOpen(conn);
                    },
                    onClosed : function() {
                        //处理登出事件
                        avalon.log('连接已经中断!')
                        self.location.href= '/login'
                    },
                    onTextMessage : function(message) {//收到文本消息时的回调方法
//                        console.log(message)
                        handleTextMessage(message);
                    },
                    onPresence : function (message){//收到联系人订阅请求的回调方法
                        handlePresence(message);
                    },
                    onRoster : function (message){//收到联系人信息的回调方法
                        handleRoster(message);
                    },
                    onError : function(e) {
                        //异常处理
                        avalon.log(e)
                        self.location.href= '/login'
                    }
                });
                conn.open({
                    user: getCookie('userid')|| sessionStorage.userid|| 1014912,
//                    pwd: MD5(1014912+ MD5('lkhealth')),
                    pwd: MD5(getCookie('userid')+ MD5('lkhealth')),
                    appKey: '77#im',//开发者APPKey
                    //accessToken : 'YWMt8bfZfFk5EeSiAzsQ0OXu4QAAAUpoZFOMJ66ic5m2LOZRhYUsRKZWINA06HI'
                })
            }
            else{
                console.warn('none userid in cookie~')
            }
            //处理连接时函数,主要是登录成功后对页面元素做处理
            var handleOpen = function(conn) {
                //从连接中获取到当前的登录人注册帐号名
                curUserId = conn.context.userId
                //查询好友列表
                conn.getRoster({
                    success: function(roster){
//                        avalon.log('roster:\n', roster)
                    }
                });
                //启动心跳
                if (conn.isOpened()) {
                    conn.setPresence();//设置用户上线状态，必须调用
                    conn.heartBeat(conn);
                }
            }
            //easemobwebim-sdk收到文本消息的回调方法的实现
            var handleTextMessage = function(message) {
                var from = message.from;//消息的发送者
                var mestype = message.type;//消息类型是群组消息or个人消息
                var msg_data = message.data;//文本消息体
                var messageContent = JSON.parse(msg_data).message//解析zyo_msg报文格式的data
                //session msg_list
                var list_name= '_'+ conn.context.userId+ '_'+ from
                if(sessionStorage[list_name]&& JSON.parse(sessionStorage[list_name]).length> 0){
                    var msg_list= []
                    msg_list= JSON.parse(sessionStorage[list_name])
                    msg_list.push(JSON.parse(message.data))
                    sessionStorage[list_name]= JSON.stringify(msg_list)
                }
                else{
                    sessionStorage[list_name]= new Array()
                    var msg_list= []//JSON.parse(sessionStorage[list_name])
                    console.log(msg_list.push(JSON.parse(message.data)))
                    sessionStorage[list_name]= JSON.stringify(msg_list)
                }
                //endof session msg_list
                //session user_list
                var name= JSON.parse(message.data).name
                    ,avatar= JSON.parse(message.data).avatar? JSON.parse(message.data).avatar: "/resource/img/icon_userphoto_loading.png"
                    ,cellPhone= JSON.parse(message.data).phone
                //newest info
                var stamp= new Date()
                    ,content= JSON.parse(message.data).message
                    ,type= JSON.parse(message.data).type
                    ,status= type==1?'sended':type==2?'img':'sending'
                console.log('receive:',name)//,avatar,cellPhone,time,stamp,content)
                var _sess_list_name= JSON.parse(sessionStorage[list_name])
                content= _sess_list_name[_sess_list_name.length-1].message
                var newest= {"time":stamp.toLocaleString(),"stamp":stamp.getTime(),"content":content,"status":status,"type":type}
                var _user= {"uid":message.from,"nickname":name,"avatar":avatar,"newest":newest};
                sessionStorage.user_list= sessionStorage.user_list|| []
                if(sessionStorage.user_list.length> 1){
                    var user_list= JSON.parse(sessionStorage.user_list)
                    console.log(11111,user_list.length,_user.uid)
                    var _flag= 0
                    for(var i= 0, l= user_list.length; i< l; i++){
                        console.log(user_list[i].uid)
                        if(user_list[i].uid== _user.uid){
                            user_list.splice(i,1)
                            user_list.reverse()
                            user_list.push(_user)
                            user_list.reverse()
                            console.log(1221, _user.newest.content)
                        }
                    }
                    if(_flag== 0){
                        user_list.reverse()
                        user_list.push(_user)
                        user_list.reverse()
                    }
                    console.log(22222,user_list.length)
                    sessionStorage.user_list= JSON.stringify(user_list)
                }
                else{
                    console.log(33333)
                    var user_list= []
                    user_list.push(_user)
                    sessionStorage.user_list= JSON.stringify(user_list)
                    console.log(44444)
                }
                if(!!avalon.vmodels.msg_index){avalon.vmodels.msg_index.uuu()}
                if(!!avalon.vmodels.msg_box){avalon.vmodels.msg_box.mmm()}
                //endof session user_list
                if(!!messageContent.match('http://image.lkhealth.net/im_img')){
                    messageContent= '<a href="'+ messageContent+ '" target="_blank"><img src="'+ messageContent+ '" style="max-height:200px;max-width:200px;"/></a>';
                }
            };
        })
    })
})