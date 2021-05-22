window.onerror = function(message, source, lineno, colno, error){
    localStorage.setItem("weather", null);
}