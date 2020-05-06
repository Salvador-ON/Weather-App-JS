const checkWeather = (system, city) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=0747aa2b81c66ff632767f1576af3d12`, { mode: 'cors' })
    .then(function (response) {
      if (response.status === 404) {
        throw new Error();
      }
      return response.json();
    })
    .then(function (response) {

      removeWelcome();
      displayData(response, system);
      
    }

      // console.log(response.main.temp);
    ).catch(function (err) {
      errorMessage("City doesn't exist in the database")
    });
}

const addListener = () => {
  const buttonCelsius = document.getElementById('celsius');
  buttonCelsius.addEventListener('click', () => {
    const cityName = document.getElementById('cityInput').value;
    validateInfo('metric', cityName);
  });

  const buttonFarenheit = document.getElementById('farenheit');
  buttonFarenheit.addEventListener('click', () => {
    const cityName = document.getElementById('cityInput').value
    validateInfo('imperial', cityName);
  });
}

const removeWelcome = () => {
  const welcomeCont = document.getElementById('welcomeCont')
  welcomeCont.className = 'd-none'
}

const errorMessage = (message) => {
  document.getElementById('errorMessage').innerHTML = "";
  const errorTemplate = document.getElementById('errorTemplate').content;
  let cloneTemplate = errorTemplate.cloneNode(true);
  document.getElementById('errorMessage').appendChild(cloneTemplate);
  document.getElementById('message').innerHTML = message;
}

const validateInfo = (system, cityName) => {
  if (cityName.length > 0) {
    checkWeather(system, cityName);
    document.getElementById('cityInput').value = '';
  }
  else {
    errorMessage("Empty Search Field")
  }
}

const displayData = (response, system) => {
  let syst = '';
  let windSpeed = '';
  if (system === 'metric'){
    syst = 'C';
    windSpeed = 'meters/s'
  }
  else {
    syst = 'F'
    windSpeed = 'miles/h'
  }
  console.log(system, response);
  document.getElementById('dataDisplay').innerHTML = "";
  const displayTemplate = document.getElementById('displayTemplate').content;
  let cloneTemplate = displayTemplate.cloneNode(true);
  cloneTemplate.getElementById('temperature').innerHTML = response.main.temp + '°' + syst;
  cloneTemplate.getElementById('sensation').innerHTML = response.main.feels_like + '°' + syst;
  cloneTemplate.getElementById('cityName').innerHTML = response.name;
  cloneTemplate.getElementById('mainDescription').innerHTML = response.weather['0'].description;
  cloneTemplate.getElementById('humidity').innerHTML = response.main.temp + '%';
  cloneTemplate.getElementById('minTemp').innerHTML = response.main.temp_min + '°' + syst;
  cloneTemplate.getElementById('maxTemp').innerHTML = response.main.temp_max + '°' + syst;
  cloneTemplate.getElementById('lonInfo').innerHTML = response.coord.lon;
  cloneTemplate.getElementById('latInfo').innerHTML = response.coord.lat;
  cloneTemplate.getElementById('windSpeed').innerHTML = response.wind.speed + windSpeed;
  cloneTemplate.getElementById('windDirection').innerHTML = response.wind.deg + '°';
  cloneTemplate.getElementById('timeZone').innerHTML = 'UTC' + timeZone(response.timezone);
  // cloneTemplate.getElementById('currentHour').innerHTML = localTime(timeZone(response.timezone));
  document.getElementById('dataDisplay').appendChild(cloneTemplate);
}

const localTime = (time) => {
const date = new Date().toISOString().split("T");
let hour = date[1].split(":");
let timeHour = (hour[0]+time)+';'+hour[1]
return timeHour
}

const timeZone = (time) => {
  
  return time/3600;
  }


  addListener();

