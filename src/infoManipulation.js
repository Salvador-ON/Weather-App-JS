export const localTime = (time) => {
  const date = new Date().toISOString().split('T');
  const hour = date[1].split(':');
  let realHour = parseInt(hour[0], 10) + parseInt(time, 10);
  if (realHour < 0) {
    realHour = 24 + realHour;
  }

  if (realHour > 24) {
    realHour -= 24;
  }

  if (realHour === 24) {
    realHour = '00';
  }

  const timeHour = `${realHour}:${hour[1]}`;
  return timeHour;
};

export const timeZone = (time) => time / 3600;

export const sunTime = (utime, localZone) => {
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

export const dayLength = (sunRise, sunSet) => {
  const hours = parseInt(sunSet.split(':')[0], 10) - parseInt(sunRise.split(':')[0], 10);
  let minutes = parseInt(sunSet.split(':')[1], 10) - parseInt(sunRise.split(':')[1], 10);
  if (minutes < 0) {
    minutes = 60 + minutes;
  }
  const time = `${hours}h ${minutes}m `;
  return time;
};