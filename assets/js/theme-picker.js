function changeTheme()
{
    //light-1 dark-2 hacker-3
    const r = document.getElementsByClassName("radio-button")[0];
    const l = document.getElementById("theme");
    let theme = localStorage.getItem("theme");
    if(theme == "light")
    {
        r.classList.remove('right-left');
        r.classList.add('left-center');
        l.href = "/assets/main-dark.css";
        localStorage.setItem("theme", "dark");
    }
    else if(theme == "dark")
    {
        r.classList.remove('left-center');
        r.classList.add('center-right');
        l.href = "/assets/main-hacker.css";
        localStorage.setItem("theme", "hacker");
    }
    else
    {
        r.classList.remove('center-right');
        r.classList.add('right-left');
        l.href = "/assets/main-light.css";
        localStorage.setItem("theme", "light");
    }
}

function setTheme()
{
    let theme = localStorage.getItem("theme");
    const r = document.getElementsByClassName("radio-button")[0];
    if(theme == "light")
        r.classList.add('right-left');
    else if(theme == "dark")
        r.classList.add('left-center');
    else
        r.classList.add('center-right');
}

setTheme();
