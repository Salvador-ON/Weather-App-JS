/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/infoManipulation.js
const localTime = (time) => {
  const date = new Date().toISOString().split('T');
  const hour = date[1].split(':');
  let realHour = parseInt(hour[0], 10) + parseInt(time, 10);
  if (realHour < 0) {
    realHour = 24 + realHour;
  }

  const timeHour = `${realHour}:${hour[1]}`;
  return timeHour;
};

const timeZone = (time) => time / 3600;

const sunTime = (utime, localZone) => {
  const unixTimeStamp = utime;
  const date = new Date(unixTimeStamp * 1000);
  date.setHours(date.getHours() + parseInt(localZone, 10));
  const utcString = date.toUTCString().split(' ')[4];
  const fullHour = utcString.split(':');
  const hours = fullHour[0];
  const minutes = fullHour[1];
  const time = `${hours}:${minutes}`;
  return time;
};

const dayLength = (sunRise, sunSet) => {
  const hours = parseInt(sunSet.split(':')[0], 10) - parseInt(sunRise.split(':')[0], 10);
  let minutes = parseInt(sunSet.split(':')[1], 10) - parseInt(sunRise.split(':')[1], 10);
  if (minutes < 0) {
    minutes = 60 + minutes;
  }
  const time = `${hours}h ${minutes}m `;
  return time;
};
// CONCATENATED MODULE: ./src/domManipulation.js



const displayData = (response, system) => {
  let syst = '';
  let windSpeed = '';
  let boolSystem = false;
  if (system === 'metric') {
    syst = 'C';
    windSpeed = 'meters/s';
    boolSystem = false;
  } else {
    syst = 'F';
    windSpeed = 'miles/h';
    boolSystem = true;
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
  cloneTemplate.getElementById('timeZone').innerHTML = `UTC ${timeZone(response.timezone)}`;
  cloneTemplate.getElementById('currentHour').innerHTML = localTime(timeZone(response.timezone));
  const sunRise = sunTime(response.sys.sunrise, timeZone(response.timezone));
  const sunSet = sunTime(response.sys.sunset, timeZone(response.timezone));
  cloneTemplate.getElementById('sunrise').innerHTML = sunRise;
  cloneTemplate.getElementById('sunset').innerHTML = sunSet;
  cloneTemplate.getElementById('durationTime').innerHTML = dayLength(sunRise, sunSet);
  cloneTemplate.getElementById('iconWeather').src = `./assets/media/icons/${response.weather['0'].icon}.png`;
  cloneTemplate.getElementById('imperialSystem').checked = boolSystem;
  document.getElementById('dataDisplay').appendChild(cloneTemplate);
};

const removeWelcome = () => {
  const welcomeCont = document.getElementById('welcomeCont');
  welcomeCont.className = 'd-none';
};

const errorMessage = (message) => {
  document.getElementById('errorMessage').innerHTML = '';
  const errorTemplate = document.getElementById('errorTemplate').content;
  const cloneTemplate = errorTemplate.cloneNode(true);
  document.getElementById('errorMessage').appendChild(cloneTemplate);
  document.getElementById('message').innerHTML = message;
};
// CONCATENATED MODULE: ./src/index.js


const toggleClick = () => {
  document.getElementById('imperialSystem').addEventListener('click', () => {
    // eslint-disable-next-line no-use-before-define
    toggleSystem();
  });
};


async function checkWeather(system, city) {
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=0747aa2b81c66ff632767f1576af3d12`, { mode: 'cors' });

  response.json().then((response) => {
    if (response.cod === 200) {
      removeWelcome();
      displayData(response, system);
      toggleClick();
    } else {
      errorMessage("City doesn't exist in the database");
    }
  }).catch(() => {
    errorMessage("City doesn't exist in the database");
  });
}

const validateInfo = (system, cityName) => {
  if (cityName.length > 0) {
    checkWeather(system, cityName);
    document.getElementById('cityInput').value = '';
  } else {
    errorMessage('Empty Search Field');
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

  document.querySelector('#cityInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      const cityName = document.getElementById('cityInput').value;
      validateInfo('metric', cityName);
    }
  });

  const buttonFarenheit = document.getElementById('farenheit');
  buttonFarenheit.addEventListener('click', () => {
    const cityName = document.getElementById('cityInput').value;
    validateInfo('imperial', cityName);
  });
};


systemSearch();


/***/ })
/******/ ]);