window.onerror = function(message, source, lineno, colno, error){
    localStorage.clear("weather");
    localStorage.clear("weather-counter");
}