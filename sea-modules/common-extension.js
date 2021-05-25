define(function(require, exports, module){
    window.dd = window.atob;
    window.d = (d)=>dd(dd(d));
});