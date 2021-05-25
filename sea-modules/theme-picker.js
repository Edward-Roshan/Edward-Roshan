define(['jquery', 'matrix'], function(require, exports, module){
    const fadingFunc = require('animation-extension').FadingOutAndIn;
    const l = $('<link id="hacker-theme" rel="stylesheet" type="text/css" href="/assets/main-hacker.css">');
    const q = $('');
    function main()
    {
        $("#hacker-theme").remove();
        $('#q').remove();
        localStorage.removeItem("theme");
    }

    function hacker()
    {
        $("#theme").after(l);
        $('body').prepend('<canvas id=q></canvas>');
        localStorage.setItem("theme", "hacker");
    }

    $(".hacker-mode").on('click', () => localStorage.getItem("theme") ? fadingFunc("body", ()=> main()) : fadingFunc("body", ()=> hacker()));

    if(localStorage.getItem("theme"))
    {
        $("#theme").after(l);
        $('body').prepend('<canvas id=q></canvas>');
    }
});


