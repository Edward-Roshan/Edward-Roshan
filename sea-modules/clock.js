define(['jquery', 'date-extension'], function(require, exports, module){
    $("#clock").text(new Date().Format("yyyy-MM-dd hh:mm:ss"));
    setTimeout(function(){
        setInterval(function(){
            $("#clock").text(new Date().Format("yyyy-MM-dd hh:mm:ss"));
        }, 1000);
    }, 500);
    setTimeout(function(){
        setInterval(function(){
            $("#clock").text(new Date().Format("yyyy-MM-dd hh mm ss"));
        }, 1000);
    }, 1000);
});
