import { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = ({ capital, latitude, longitude }) => {
  const [weather, setWeather] = useState('');
  useEffect(() => {
    const getWeather = async () => {
      const res = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&current_weather=true`
      );
      setWeather(res.data);
    };
    getWeather();
    console.log(weather);
  }, [capital, latitude, longitude]);
  return (
    <div>
      <h3>Weather in {capital}</h3>

      {weather && (
        <>
          <div>
            Current temperature: {weather.current_weather.temperature}°C
          </div>
          <div>Wind speed: {weather.current_weather.windspeed}Km/h</div>
        </>
      )}
    </div>
  );
};

export default Weather;

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m
