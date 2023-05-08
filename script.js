const input = document.querySelector('#input');
const city = document.querySelector('#city');
const temp = document.querySelector('#temp');
const feelsLike = document.querySelector('#feels-like');
const conditions = document.querySelector('#conditions');
const wind = document.querySelector('#wind');
const info = document.querySelector('.info');
const date = document.querySelector('#date');
const apiKey = "d8f43297e181f4e12464e757d227bf6c";

navigator.geolocation.getCurrentPosition(success);

async function success(position) {
    document.querySelector('.alert').style.display = 'none';
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const geocoding = await fetch(`https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lng}&limit=5&appid=${apiKey}`);
    const result = await geocoding.json();
    const currentCity = result['0'].name;
    getWeather(currentCity);
}

input.addEventListener('keypress', e => {
    if(e.keyCode === 13) {
        getWeather(input.value);
    }
})

async function getWeather(data) {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${data}&units=metric&appid=${apiKey}`);
    const resReceived = await res.json();
    if (resReceived.message == "city not found") {
        city.textContent = "Sorry, we could not find this city";
        info.style.display = 'none';
    }
    else showWeather(resReceived);
}

function showWeather(resReceived) {
    info.style.display = 'block';
    city.textContent = ` ${resReceived.name}, ${resReceived.sys.country}`;
    getCurrentDate();
    temp.innerHTML = `${Math.round(resReceived.main.temp)}<span>°</span>`;
    feelsLike.innerHTML = `Feels like: ${Math.round(resReceived.main.feels_like)}<span>°</span>`;
    conditions.textContent = resReceived.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(resReceived.wind.speed*3,6)} km/h`;
    console.log(resReceived)
}

function getCurrentDate() {
    const currentDate = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let todayDate = currentDate.getDate();

    let todayDay = days[currentDate.getDay()];

    let todayMonth = months[currentDate.getMonth()];

    let todayYear = currentDate.getFullYear();

    date.textContent = `${todayDay} ${todayDate} ${todayMonth} ${todayYear}`;
}