define(['jquery'], function(require, exports, module){
    module.exports.FadingOutAndIn = function(element, blinkOutCB, blinkInCB)
    {
        $(element).addClass('blink-out');
        setTimeout(function(){
            if(blinkOutCB) blinkOutCB();
            $(element).removeClass('blink-out');
            $(element).addClass('blink-in');
            setTimeout(function(){
                $(element).removeClass('blink-in');
                if(blinkInCB) blinkInCB();
            }, 500);
        }, 500);
    }
});