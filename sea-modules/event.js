define(function(require, exports, module) {
    window.onerror = function(message, source, lineno, colno, error){
        localStorage.clear();
        console.error(error);
    }
});

