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
/***/ (function(module, exports) {

const checkWeather = (system, city) => {
  fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=${system}&appid=0747aa2b81c66ff632767f1576af3d12`, { mode: 'cors' })
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


addListrener();



/***/ })
/******/ ]);