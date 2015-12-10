require(['avalon'], function(avalon){
     app_footer= avalon.define({
        $id: 'app_footer',
        user: {
            uid: '',
            nickname: '登陆',
            operate: '注册',
            avatar: '/resource/img/placeholder_unuser_avatar.png',
            userlat: sessionStorage.userlat,
            userlng: sessionStorage.userlng,
        },
    })
    console.log(app_footer.user.userlat)
    avalon.scan();
})