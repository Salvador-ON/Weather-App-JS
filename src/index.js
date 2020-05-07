import * as domMan from './domManipulation';

const toggleClick = () => {
  document.getElementById('imperialSystem').addEventListener('click', () => {
    toggleSystem();
  // const cityName = document.getElementById('cityInput').value;
  // validateInfo('imperial', cityName);
  });
};


async function checkWeather(system, city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=0747aa2b81c66ff632767f1576af3d12`, { mode: 'cors' });

  response.json().then((response) => {
    if (response.cod === 200) {
      domMan.removeWelcome();
      domMan.displayData(response, system);
      toggleClick();
    } else {
      domMan.errorMessage("City doesn't exist in the database");
    }
  }).catch(() => {
    domMan.errorMessage("City doesn't exist in the database");
  });
}

const validateInfo = (system, cityName) => {
  if (cityName.length > 0) {
    checkWeather(system, cityName);
    document.getElementById('cityInput').value = '';
  } else {
    domMan.errorMessage('Empty Search Field');
  }
};

const toggleSystem = () => {
  const farenheit = document.getElementById('imperialSystem').checked;
  const cityName = document.getElementById('cityName').innerHTML;
  if (farenheit) {
    validateInfo('imperial', cityName);
  } else {
    validateInfo('metric', cityName);
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
