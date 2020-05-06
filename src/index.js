const checkWeather = (system, city) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=0747aa2b81c66ff632767f1576af3d12`, { mode: 'cors' })
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      if (response.status !== 404) {
        removeWelcome();
        displayData();
        console.log('good', response);
      } else
      {
        errorMessage("City doesn't exist in the database")
      }
      
      // console.log(response.main.temp);
    }).catch(function (err) {
      console.log(err) 
    });
}

const addListrener = () => {
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

const displayData = () => {
  document.getElementById('dataDisplay').innerHTML = "";
  const displayTemplate = document.getElementById('displayTemplate').content;
  let cloneTemplate = displayTemplate.cloneNode(true);
  document.getElementById('dataDisplay').appendChild(cloneTemplate);
}

addListrener();

