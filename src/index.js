const checkWeather = () => {
  fetch('http://api.openweathermap.org/data/2.5/weather?q=salta&units=metric&appid=0747aa2b81c66ff632767f1576af3d12', { mode: 'cors' })
  .then(function (response) {
    return response.json();
  })
  .then(function (response) {
    console.log(response);
    console.log(response.main.temp);
  })

  .catch(function (err) {
    console.log(err)
  });
}

const addListrener = () => {
  const button1 = document.getElementById('button1');
  button1.addEventListener('click', () => {
    checkWeather();
  });
}

addListrener();