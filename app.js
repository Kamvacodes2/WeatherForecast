'use strict'

'use strict';

const temp = document.getElementById('temp');
const date = document.getElementById('date-time');
const currentLocation = document.getElementById('location');
const condition = document.getElementById('condition');
const rain = document.getElementById('rain');
const mainIcon = document.getElementById('icon');
const uvIndex = document.querySelector('.uv-index');
const uvText = document.querySelector('.uv-text');
const sunRise = document.querySelector('.sunrise');
const sunSet = document.querySelector('.sunset');
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const humidityStatus = document.querySelector('.humidity-status');
const visibility = document.querySelector('.visibility');
const visibilityStatus = document.querySelector('.visibility-status');
const weatherCards = document.querySelector("#weather-cards");
const celsiusBtn = document.querySelector('.celsius');
const fahrenheitBtn = document.querySelector('.farhenheit');
const hourlyBtn = document.querySelector('.hourly');
const weekBtn = document.querySelector('.week');
const tempUnit = document.querySelectorAll('.temp-unit');
const formSearch = document.querySelector('#search');
const searchInput = document.querySelector('#query');

let currentCity = "";
let currentUnit = "c";
let hourlyWeek = "week";

// Input dates and times
function getDateTime() {
    let now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes();

    let days = [
        'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];

    // Time format 
    hour = hour % 24;

    if (hour < 10) {
        hour = '0' + hour;
    }

    if (minute < 10) {
        minute = '0' + minute;
    }

    let dayString = days[now.getDay()];
    return `${dayString}, ${hour}:${minute}`;
}

date.innerText = getDateTime();

// Update the time every second
setInterval(() => {
    date.innerText = getDateTime();
}, 1000);

// Fetch public IP to get initial location
function getPublicIp() {
    fetch('https://geolocation-db.com/json/', { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            currentCity = data.city;
            getWeather(currentCity, currentUnit, hourlyWeek);
        });
}

getPublicIp();

// Fetch weather data
function getWeather(city, unit, hourlyWeek) {
    const apiKey = 'F3NNCPQVMW57CD2WNXVMVVU3X';
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`, { method: 'GET' })
        .then((response) => response.json())
        .then((data) => {
            let today = data.currentConditions;
            temp.innerText = unit === "c" ? today.temp : celsiusToFarenheit(today.temp);
            currentLocation.innerText = data.resolvedAddress;
            condition.innerText = today.conditions;
            rain.innerText = "Perc - " + today.precip + "%";
            uvIndex.innerText = today.uvindex;
            windSpeed.innerText = today.windspeed;
            humidity.innerText = today.humidity + "%";
            visibility.innerText = today.visibility;
            measureUvIndex(today.uvindex);
            humidityStat(today.humidity);
            visibilityStat(today.visibility);
            sunRise.innerText = convertTo24HrFormat(today.sunrise);
            sunSet.innerText = convertTo24HrFormat(today.sunset);
            mainIcon.src = getIcon(today.icon);
            if (hourlyWeek === "hourly") {
                updateForecast(data.days[0].hours, unit, "day");
            } else {
                updateForecast(data.days, unit, 'week');
            }
        }).catch((error) => {
            alert('City not found in database');
        });
}

// Convert Celsius to Fahrenheit
function celsiusToFarenheit(temp) {
    return ((temp * 9) / 5 + 32).toFixed(1);
}

// UV index calculation function
function measureUvIndex(uvIndex) {
    if (uvIndex <= 2) {
        uvText.innerText = "Low";
    } else if (uvIndex <= 5) {
        uvText.innerText = 'Moderate';
    } else if (uvIndex <= 10) {
        uvText

/*const temp = document.getElementById('temp');
const date = document.getElementById('date-time');
const currentLocation = document.getElementById('location');
const condition = document.getElementById('condition');
const rain = document.getElementById('rain');
const mainIcon = document.getElementById('icon')
const uvIndex = document.querySelector('.uv-index');
const uvText = document.querySelector('.uv-text');
const sunRise = document.querySelector('.sunrise')
const sunSet = document.querySelector('.sunset')
const windSpeed = document.querySelector('.wind-speed');
const humidity = document.querySelector('.humidity');
const humidityStatus = document.querySelector('.humidity-status');
const visibility = document.querySelector('.visibility');
const visibilityStatus = document.querySelector('.visibility-status');
// const airQuality = document.querySelector('.air-quality');
// const airQualityStatus = document.querySelector('.air-quality-status');
const weatherCards = document.querySelector("#weather-cards");
const celsiusBtn = document.querySelector('.celsius');
const fahrenheitBtn = document.querySelector('.farhenheit');
const hourlyBtn = document.querySelector('.hourly');
const weekBtn = document.querySelector('.week');
const tempUnit = document.querySelectorAll('.temp-unit');
const formSearch = document.querySelector('#search');
const searchInput = document.querySelector('#query');


let currentCity = "";
let currentUnit = "c";
let hourlyWeek = "week";

//Input dates and times

function getDateTime() {
    let now = new Date(),
        hour = now.getHours(),
        minute = now.getMinutes()

    let days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ];

    // Time format 
    hour = hour % 24;

    if (hour < 10) {
        hour = '0' + hour
    }

    if (minute < 10) {
        minute = '0' + minute
    }

    let dayString = days[now.getDay()];
    return `${dayString}, ${hour}:${minute}`
}

date.innerText = getDateTime();

// update the time every second
setInterval(() => {
    date.innerText = getDateTime();
}, 1000)

// utilizing the promise concepts through fetch()

function getPublicIp() {
    fetch('https://geolocation-db.com/json/',
        { method: 'GET', }).then((response) => response.json())
        .then((data) => {
            currentCity = data.currentCity
            getWeather(data.city, currentUnit, hourlyWeek)
        })
}

getPublicIp();

// fetch to retrieve weather data

function getWeather(city, unit, hourlyWeek) {
    const apiKey = 'F3NNCPQVMW57CD2WNXVMVVU3X';
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${apiKey}&contentType=json`, { method: 'GET', })
        .then((response) => response.json())
        .then((data) => {
            let today = data.currentConditions;
            if (unit === "c") {
                temp.innerText = today.temp;
            } else {
                temp.innerText = celsiusToFarenheit(today.temp)
            }
            currentLocation.innerText = data.resolvedAddress;
            condition.innerText = today.conditions;
            rain.innerText = "Perc - " + today.precip + "%";
            uvIndex.innerText = today.uvindex;
            windSpeed.innerText = today.windspeed;
            humidity.innerText = today.humidity + "%";
            visibility.innerText = today.visibility;
            // airQuality.innerText = today.winddir;
            measureUvIndex(today.uvindex);
            humidityStat(today.humidity);
            visibilityStat(today.visibility);
            // airQualityStat(today.winddir);
            // windSpeedStat(today.windspeed);
            sunRise.innerText = convetTo24HrFormat(today.sunrise);
            sunSet.innerText = convetTo24HrFormat(today.sunset);
            mainIcon.src = getIcon(today.icon);
            if (hourlyWeek === "hourly") {
                updateForecast(data.days[0].hours, unit, "day")
            } else {
                updateForecast(data.days, unit, 'week');
            }
        }).catch((error) => {
            alert('City not found in database');
        })
}

// converting Celsius to Farenheit

function celsiusToFarenheit(temp) {
    return ((temp * 9) / 5 + 32).toFixed(1)
}

// UV index calculation function
function measureUvIndex(uvIndex) {
    if (uvIndex <= 2) {
        uvText.innerText = "Low"
    } else if (uvIndex <= 5) {
        uvText.innerText = 'Moderate'
    } else if (uvIndex <= 10) {
        uvText.innerText = 'Very High'
    } else {
        uvText.innerText = 'Extreme'
    }

}

function humidityStat(humidity) {
    if (humidity <= 30) {
        humidityStatus.innerText = 'Low'
    } else if (humidity <= 60) {
        humidityStatus.innerText = 'Moderate'
    } else {
        humidityStatus.innerText = 'High'
    }
}


function visibilityStat(visibility) {
    if (visibility <= 0.3) {
        visibilityStatus.innerText = "Dense Fog";
    } else if (visibility <= 0.16) {
        visibilityStatus.innerText = 'Moderate Fog';
    } else if (visibility <= 0.35) {
        visibilityStatus.innerText = 'Light Fog';
    } else if (visibility <= 1.13) {
        visibilityStatus.innerText = 'Very Light Fog';
    } else if (visibility <= 2.16) {
        visibilityStatus.innerText = 'Light mist';
    } else if (visibility <= 5.3) {
        visibilityStatus.innerText = 'Very Light Mist';
    } else if (visibility <= 10.7) {
        visibilityStatus.innerText = 'Clear Air';
    } else {
        visibilityStatus.innerText = 'Very Clear Air';
    }

}

// function airQualityStat(airQuality) {
//     if (airQuality <= 50) {
//         airQualityStatus.innerText = "Good";
//     } else if (airQuality <= 100) {
//         airQualityStatus.innerText = "Moderate";
//     } else if (airQuality <= 150) {
//         airQualityStatus.innerText = "Unhealthy For Sensitive Groups";
//     } else if (airQuality <= 200) {
//         airQualityStatus.innerText = "Unhealthy";
//     } else if (airQuality <= 250) {
//         airQualityStatus.innerText = "Very Unhealthy";
//     } else {
//         airQualityStatus.innerText = 'Hazardous'
//     }
// }

function convetTo24HrFormat(time) {
    let hour = time.split(":")[0];
    let minute = time.split(":")[1];
    let ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour;
    hour = hour ? hour : 12;
    hour = hour < 12 ?  hour : hour;
    minute = minute < 10 ?  minute : minute;
    let strTime = hour + ":" + minute + ":" + ampm;
    return strTime;
}

function getIcon(condition) {
    if (condition === "partly-cloudy-day") {
        return "weather_icons_dovora_interactive/PNG/256/day_partial_cloud.png"
    } else if (condition === "partly-cloudy-night") {
        return "weather_icons_dovora_interactive/PNG/256/night_full_moon_partial_cloud.png"
    } else if (condition === "rain") {
        return "weather_icons_dovora_interactive/PNG/256/rain.png"
    } else if (condition === "clear-day") {
        return "weather_icons_dovora_interactive/PNG/256/day_clear.png"
    } else if (condition === "clear-night") {
        return "weather_icons_dovora_interactive/PNG/256/night_full_moon_clear.png"
    } else if (condition === "overcast")  {
        return "weather_icons_dovora_interactive/PNG/256/overcast.png"
    } else {
        return "weather_icons_dovora_interactive/PNG/256/day_clear.png"
    }
}

function getHour(time) {
    let hour = time.split(":")[0];
    let minute = time.split(":")[1];
    if (hour >= 12) {
        hour = hour
        return `${hour}:${minute} PM`
    } else {
        return `${hour}:${minute} AM`
    }
}

function getDayName(date) {
    let day = new Date(date);
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day.getDay()];


}

function updateForecast(data, unit, type) {
    weatherCards.innerHTML = "";
    let day = 0;
    let numCards = 0;
    // 24 cards in relation to the hours and 7 in relation the week
    if (type === 'day') {
        numCards = 24;
    } else {
        numCards = 7;
    }

    for (let i = 0; i < numCards; i++) {
        let card = document.createElement('div');
        card.classList.add('card');
        let dayName = getHour(data[day].datetime);
        if (type === 'week') {
            dayName = getDayName(data[day].datetime);
        }
        let dayTemp = data[day].temp;
        if (unit === "f") {
            dayTemp = celsiusToFarenheit(data[day].temp)
        }
        let iconCondition = data[day].icon;
        let iconSrc = getIcon(iconCondition);
        let tempUnit = '°C';
        if (unit === 'f') {
            tempUnit = '°F'
        }
        card.innerHTML = `
        
        <h2 class="day-name">${dayName}</h2>
        <div class="card-icon">
            <img src="${iconSrc}" alt="">
        </div>
        <div class="day-temp">
            <h2 class="temp">${dayTemp}</h2>
            <span class="temp-unit">${tempUnit}</span>
        </div>
        
        `;
        weatherCards.appendChild(card);
        day++
    }
}

fahrenheitBtn.addEventListener('click', () => {
    changeUnit('f')
})

celsiusBtn.addEventListener('click', () => {
    changeUnit('c')
})

function changeUnit(unit) {
    if (currentUnit !== unit) {
        currentUnit = unit;
        {
            tempUnit.forEach((item) => {
                item.innerText = `${unit.toUpperCase()}`
            });

            if (unit === "c") {
                celsiusBtn.classList.add('active');
                fahrenheitBtn.classList.remove('active');
            } else {
                celsiusBtn.classList.remove('active');
                fahrenheitBtn.classList.add('active');
            }
            currentCity === "" ? getPublicIp(): getWeather(currentCity, currentUnit, hourlyWeek);
            // getWeather(currentCity, currentUnit, hourlyWeek);
        }
    }
}

hourlyBtn.addEventListener('click', () => {
    changeTime('hourly');
});
weekBtn.addEventListener('click', () => {
    changeTime('week');
});

function changeTime(unit) {
    if (hourlyWeek !== unit) {
        hourlyWeek = unit;
        if(unit === 'hourly') {
            hourlyBtn.classList.add('active');
            weekBtn.classList.remove('active');
        } else {
            hourlyBtn.classList.remove('active');
            weekBtn.classList.add('active');
        }

        // getWeather(currentCity, currentUnit, hourlyWeek);
        currentCity === "" ? getPublicIp(): getWeather(currentCity, currentUnit, hourlyWeek);
    }
}

formSearch.addEventListener('submit', (e) => {
    e.preventDefault();
    let location = searchInput.value;

    if (location) {
        currentCity = location;
        getWeather(currentCity, currentUnit, hourlyWeek);
    }
})

let cities = ['Cape Town', 'East London', 'Gqeberha', 'Pretoria', 'London', 'Berlin', 'New York'];

let currentPoint;

searchInput.addEventListener('input', (e) => {
    let a;
    let b;
    let val = this.value;
    if(!val) {
        return false;
    }
    currentPoint = -1;

    a = document.createElement('ul');
    a.setAttribute('id', 'suggestion');

    // we are appending the ul to the form i.e the parent
    this.parentNode.appendChild(a);
    console.log(this.parentNode);

    for (let i = 0; cities.length; i++) {

        if (cities[i].substring(0, val.length).toUpperCase() === val.toUpperCase());
        b = document.createElement('li');
        b.innerHTML = `<strong>${cities[i].substring(0, val.length)}</strong>`;
        b.innerHTML += cities[i].substring(0, val.length);
        b.innerHTML += `<input type="hidden" value="${cities[i]}"></input>`
        b.addEventListener('click', function(e) {
            searchInput.value = this.getElementsByTagName('input')[0].value;
        });

        a.appendChild(b);
    }
})*/
