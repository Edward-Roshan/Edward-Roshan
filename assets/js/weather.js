let w = document.getElementById("weather");
let weather = [];
let counter = 0;
const p = new Proxy(weather, {
    set: function(target, property, value, receiver) {
        target[property] = value;
        if(property == 0 && counter == 0)
        {
            display(weather[counter]);
            startTimer();
        }
        return true;
    },
});

(function() {
    Date.prototype.addHours = function (h) {
        return this.setHours(this.getHours() + h);
    }

    const cities = ['Shanghai', 'Beijing', 'Bangkok', 'New York', 'London', 'Tokyo', 'Singapore', 'Sydney'];
    let c = localStorage.getItem("weather-counter");
    if(c) counter = c;
    let ls = localStorage.getItem("weather");
    ls = JSON.parse(ls);
    if(ls)
    {
        const expired = ls.expire < (new Date()).getTime();
        const data = ls.data;
        if(data && !expired)
            data.forEach(c=>p.push(c));
        else
            localStorage.setItem("weather", null);
    }
    else
    {
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
            xhr.setRequestHeader("x-rapidapi-key", "8b526891f0mshbc327a85ded2125p11fc96jsndbb828645daa");
            xhr.setRequestHeader("x-rapidapi-host", "weatherapi-com.p.rapidapi.com");
            
            xhr.send(data);

        }
        cities.forEach(c=>fetch(c));
    }
})();

function display(wc)
{
    w.classList.add('blink-out');
    setTimeout(function(){
        w.innerText = wc.city + ', ' + wc.condition + ' ' + wc.temp_c + '℃';
        w.classList.remove('blink-out');
        w.classList.add('blink-in');
        setTimeout(function(){
            w.classList.remove('blink-in');
            counter++;
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
