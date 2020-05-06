import * as infoMan from './infoManipulation';

export const displayData = (response, system) => {
  let syst = '';
  let windSpeed = '';
  if (system === 'metric') {
    syst = 'C';
    windSpeed = 'meters/s';
  } else {
    syst = 'F';
    windSpeed = 'miles/h';
  }
  document.getElementById('dataDisplay').innerHTML = '';
  const displayTemplate = document.getElementById('displayTemplate').content;
  const cloneTemplate = displayTemplate.cloneNode(true);
  cloneTemplate.getElementById('temperature').innerHTML = `${response.main.temp}°${syst}`;
  cloneTemplate.getElementById('sensation').innerHTML = `${response.main.feels_like}°${syst}`;
  cloneTemplate.getElementById('cityName').innerHTML = response.name;
  cloneTemplate.getElementById('mainDescription').innerHTML = response.weather['0'].description;
  cloneTemplate.getElementById('humidity').innerHTML = `${response.main.temp}%`;
  cloneTemplate.getElementById('minTemp').innerHTML = `${response.main.temp_min}°${syst}`;
  cloneTemplate.getElementById('maxTemp').innerHTML = `${response.main.temp_max}°${syst}`;
  cloneTemplate.getElementById('lonInfo').innerHTML = response.coord.lon;
  cloneTemplate.getElementById('latInfo').innerHTML = response.coord.lat;
  cloneTemplate.getElementById('windSpeed').innerHTML = response.wind.speed + windSpeed;
  cloneTemplate.getElementById('windDirection').innerHTML = `${response.wind.deg}°`;
  cloneTemplate.getElementById('timeZone').innerHTML = `UTC ${infoMan.timeZone(response.timezone)}`;
  cloneTemplate.getElementById('currentHour').innerHTML = infoMan.localTime(infoMan.timeZone(response.timezone));
  const sunRise = infoMan.sunTime(response.sys.sunrise, infoMan.timeZone(response.timezone));
  const sunSet = infoMan.sunTime(response.sys.sunset, infoMan.timeZone(response.timezone));
  cloneTemplate.getElementById('sunrise').innerHTML = sunRise;
  cloneTemplate.getElementById('sunset').innerHTML = sunSet;
  cloneTemplate.getElementById('durationTime').innerHTML = infoMan.dayLength(sunRise, sunSet);
  cloneTemplate.getElementById('iconWeather').src = `./assets/media/icons/${response.weather['0'].icon}.png`;
  document.getElementById('dataDisplay').appendChild(cloneTemplate);
};

export const removeWelcome = () => {
  const welcomeCont = document.getElementById('welcomeCont');
  welcomeCont.className = 'd-none';
};

export const errorMessage = (message) => {
  document.getElementById('errorMessage').innerHTML = '';
  const errorTemplate = document.getElementById('errorTemplate').content;
  const cloneTemplate = errorTemplate.cloneNode(true);
  document.getElementById('errorMessage').appendChild(cloneTemplate);
  document.getElementById('message').innerHTML = message;
};