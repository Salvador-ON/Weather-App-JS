import * as domMan from './domManipulation';

const checkWeather = (system, city) => {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=0747aa2b81c66ff632767f1576af3d12`, { mode: 'cors' })
    .then((response) => {
      if (response.status === 404) {
        throw new Error();
      }
      return response.json();
    })
    .then((response) => {
      domMan.removeWelcome();
      domMan.displayData(response, system);
    }).catch(() => {
      domMan.errorMessage("City doesn't exist in the database");
    });
};

const validateInfo = (system, cityName) => {
  if (cityName.length > 0) {
    checkWeather(system, cityName);
    document.getElementById('cityInput').value = '';
  } else {
    domMan.errorMessage('Empty Search Field');
  }
};

const systemSearch = () => {
  const buttonCelsius = document.getElementById('celsius');
  buttonCelsius.addEventListener('click', () => {
    const cityName = document.getElementById('cityInput').value;
    validateInfo('metric', cityName);
  });

  const buttonFarenheit = document.getElementById('farenheit');
  buttonFarenheit.addEventListener('click', () => {
    const cityName = document.getElementById('cityInput').value;
    validateInfo('imperial', cityName);
  });
};

systemSearch();
