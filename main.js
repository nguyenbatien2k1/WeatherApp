var search = document.querySelector('.search')
var city = document.querySelector('.city')
var country = document.querySelector('.country')
var valueTemperature = document.querySelector('.value-temperature')
var shortDescription = document.querySelector('.short-description')
var visibility = document.querySelector('.visibility span')
var wind = document.querySelector('.wind span')
var humidity = document.querySelector('.humidity span')
var content = document.querySelector('.content')
var time = document.querySelector('.time')

var deleteValueSearch = document.querySelector('.deleteValueSearch')

deleteValueSearch.addEventListener('click', function(e) {
    console.log(e.target)
    search.value = ''
})


async function changeWeatherUI(input) {
    let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${input}&units=metric&appid=52e16291abc9acc979841a1e8ff2f8ab&lang=vi`
    let data = await fetch(apiURL).then(res => res.json())

    if (data.cod == 200) {
        content.classList.remove('hidden')
        city.innerText = data.name
        country.innerText = data.sys.country
        let temp = Math.floor(data.main.temp)
        valueTemperature.innerText = temp + '°C'
        if (temp > 15 && temp <= 20) {
            document.querySelector('body').setAttribute('class', 'warm')
        }

        else if (temp > 30) {
            document.querySelector('body').setAttribute('class', 'hot')
        }

        else if (temp > 20 && temp <= 30) {
            document.querySelector('body').setAttribute('class', 'cool')
        }

        else if (temp <= 15) {
            document.querySelector('body').setAttribute('class', 'cold')
        }

        shortDescription.innerText = `Mô tả:
        ${data.weather[0].description.charAt(0).toUpperCase()}${data.weather[0].description.slice(1)}`
        visibility.innerText = data.visibility + '(m/s)'
        wind.innerText = data.wind.speed + '(m/s)'
        humidity.innerHTML = data.main.humidity + '(%)'
        time.innerText = startTime()
    }

    else {
        content.classList.add('hidden')
    }
}

changeWeatherUI('ha noi')

search.addEventListener('keypress', function (e) {
    let input = search.value.trim()
    if (e.which === 13) {
        changeWeatherUI(input)
    }
})

function startTime() {
    let today = new Date()
    let hours = today.getHours()
    let minutes = today.getMinutes()
    let seconds = today.getSeconds()
    
    if(hours < 10) {
        hours = '0' + hours
    }

    if(minutes < 10) {
        minutes = '0' + minutes
    }

    if(seconds < 10) {
        seconds = '0' + seconds
    }

    time.innerText = `${hours} : ${minutes} : ${seconds}

    Thứ ${today.getDay() + 1} Ngày ${today.getDate()} Tháng ${today.getMonth()} Năm ${2022}
    `

    // Auto refeshing time
    setTimeout(() => startTime(), 1000)
}