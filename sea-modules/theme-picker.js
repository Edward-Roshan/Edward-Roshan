define(['jquery'], function(require, exports, module){
    function changeTheme()
    {
        //light-1 dark-2 hacker-3
        const r = $(".radio-button");
        const l = $("#theme");
        let theme = localStorage.getItem("theme");
        if(theme == "light")
        {
            r.removeClass('right-left');
            r.addClass('left-center');
            l.attr("href", "/assets/main-dark.css");
            localStorage.setItem("theme", "dark");
        }
        else if(theme == "dark")
        {
            r.removeClass('left-center');
            r.addClass('center-right');
            l.attr("href", "/assets/main-hacker.css");
            localStorage.setItem("theme", "hacker");
        }
        else
        {
            r.removeClass('center-right');
            r.addClass('right-left');
            l.attr("href", "/assets/main-light.css");
            localStorage.setItem("theme", "light");
        }
    }
    
    (function setTheme()
    {
        let theme = localStorage.getItem("theme");
        const r = $(".radio-button");
        if(theme == "light")
            r.addClass('right-left');
        else if(theme == "dark")
            r.addClass('left-center');
        else
            r.addClass('center-right');
    })();
    
    $(".radio-button").on('click', changeTheme);
});


