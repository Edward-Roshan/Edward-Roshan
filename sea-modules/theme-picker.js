define(['jquery', 'matrix'], function(require, exports, module){
    const matrix = require('matrix');
    const fadingFunc = require('animation-extension').FadingOutAndIn;
    const l = $('<link id="hacker-theme" rel="stylesheet" type="text/css" href="/assets/main-hacker.css">');
    const q = $('<canvas id=q></canvas>');
    function main()
    {
        $("#hacker-theme").remove();
        matrix.endMatrix();
        $('#q').remove();
        localStorage.removeItem("theme");
    }

    function hacker()
    {
        $("#theme").after(l);
        $('body').prepend(q);
        matrix.startMatrix();
        localStorage.setItem("theme", "hacker");
    }

    if(localStorage.getItem("theme"))
    {
        $("#theme").after(l);
        $('body').prepend(q);
        matrix.startMatrix();
    }
    
    $(".hacker-mode").on('click', () => localStorage.getItem("theme") ? fadingFunc("body", ()=> main()) : fadingFunc("body", ()=> hacker()));

});


