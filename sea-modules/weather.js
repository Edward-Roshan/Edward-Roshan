define(['jquery', 'date-extension'], function(require, exports, module){
    let w = $("#weather");
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
            localStorage.clear("weather");
            localStorage.clear("weather-counter");
        }
    }
    else
    {
        localStorage.clear("weather");
        localStorage.clear("weather-counter");
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
            xhr.setRequestHeader("x-rapidapi-key", window.atob("OGI1MjY4OTFmMG1zaGJjMzI3YTg1ZGVkMjEyNXAxMWZjOTZqc25kYmI4Mjg2NDVkYWE="));
            xhr.setRequestHeader("x-rapidapi-host", "weatherapi-com.p.rapidapi.com");
            xhr.send(data);
        }
        cities.forEach(c=>fetch(c));
    }
    
    function display(wc)
    {
        w.addClass('blink-out');
        setTimeout(function(){
            w.text(wc.city + ', ' + wc.condition + ' ' + wc.temp_c + '℃');
            w.removeClass('blink-out');
            w.addClass('blink-in');
            setTimeout(function(){
                w.removeClass('blink-in');
                counter++;
                counter %= weather.length;
                localStorage.setItem("weather-counter", counter);
            }, 500);
        }, 500);
    }
    
    function startTimer()
    {
        setInterval(function(){
            counter %= weather.length;
            display(weather[counter]);
        }, 10000);
    }
});
