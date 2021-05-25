define(['jquery', 'date-extension', 'animation-extension', 'common-extension'], function(require, exports, module){
    const fadingFunc = require('animation-extension').FadingOutAndIn;
    let newfetch = false;
    let weather = [];
    let counter = 0;
    
    const p = new Proxy(weather, {
        set: function(target, property, value, receiver) {
            target[property] = value;
            if(property == 0 && counter == 0 && newfetch)
            {
                display(target[property]);
                startTimer();
            }
            return true;
        },
    });
    
    const cities = ['Shanghai', 'Beijing', 'Bangkok', 'New York', 'London', 'Tokyo', 'Singapore', 'Sydney'];
    let c = localStorage.getItem("weather-counter");
    if(c) counter = c;
    let ls = localStorage.getItem("weather");
    ls = JSON.parse(ls);
    if(ls)
    {
        newfetch = false;
        const expired = ls.expire < (new Date()).getTime();
        const data = ls.data;
        if(data && !expired)
        {
            data.forEach(c=>p.push(c));
            display(weather[counter]);
            startTimer();
        }
        else
        {
            localStorage.removeItem("weather");
            localStorage.removeItem("weather-counter");
        }
    }
    else
    {
        localStorage.removeItem("weather");
        localStorage.removeItem("weather-counter");
        newfetch = true;
        function fetch(city)
        {
            const data = null;
            const xhr = new XMLHttpRequest();
            xhr.withCredentials = true;
            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === this.DONE) {
                    let j = JSON.parse(this.responseText);
                    p.push({
                        city: j.location.name,
                        temp_c: j.current.temp_c,
                        condition: j.current.condition.text
                    });
                    localStorage.setItem("weather", JSON.stringify({
                        expire: (new Date()).addHours(4),
                        data: weather
                    }));
                }
            });
            xhr.open("GET", "https://weatherapi-com.p.rapidapi.com/forecast.json?q=" + city + "&lang=zh-cn");
            xhr.setRequestHeader("x-rapidapi-key", d("T0dJMU1qWTRPVEZtTUcxemFHSmpNekkzWVRnMVpHVmtNakV5TlhBeE1XWmpPVFpxYzI1a1ltSTRNamcyTkRWa1lXRT0="));
            xhr.setRequestHeader("x-rapidapi-host", "weatherapi-com.p.rapidapi.com");
            xhr.send(data);
        }
        cities.forEach(c=>fetch(c));
    }
    
    function display(wc)
    {
        fadingFunc("#weather", () => {
            $("#weather").text(wc.city + ', ' + wc.condition + ' ' + wc.temp_c + '℃');
        }, () => {
            counter++;
            counter %= weather.length;
            localStorage.setItem("weather-counter", counter);
        });
    }
    
    function startTimer()
    {
        setInterval(() => {
            counter %= weather.length;
            display(weather[counter]);
        }, 10000);
    }
});
