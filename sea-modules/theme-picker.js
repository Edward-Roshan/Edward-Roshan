define(['jquery'], function(require, exports, module){
    const fadingFunc = require('animation-extension').FadingOutAndIn;

    function main()
    {
        $("#hacker-theme").remove();
        localStorage.removeItem("theme");
    }

    function hacker()
    {
        $("#theme").append('<link id="hacker-theme" rel="stylesheet" type="text/css" href="/assets/main-hacker.css">');
        localStorage.setItem("theme", "hacker");
    }

    $(".hacker-mode").on('click', () => localStorage.getItem("theme") ? fadingFunc("body", ()=> main()) : fadingFunc("body", ()=> hacker()));

    localStorage.getItem("theme") ? $("#theme").append('<link id="hacker-theme" rel="stylesheet" type="text/css" href="/assets/main-hacker.css">') : null;
});


