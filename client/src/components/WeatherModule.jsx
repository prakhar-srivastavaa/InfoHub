import { useState, useEffect } from 'react';
import axios from 'axios';

const WeatherModule = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [city, setCity] = useState('Hyderabad');
  const [searchCity, setSearchCity] = useState('Hyderabad');

  const fetchWeather = async (cityName) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:3001/api/weather?city=${cityName}`);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch weather data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity);
    }
  };

  return (
    <div className="module-container">
      <h2 className="module-title">🌤️ Real-Time Weather</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchCity}
          onChange={(e) => setSearchCity(e.target.value)}
          placeholder="Enter city name..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          Search
        </button>
      </form>

      {isLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading weather data...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p className="error-message">❌ {error}</p>
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="weather-display">
          <div className="weather-header">
            <h3>{data.city}, {data.country}</h3>
            <img 
              src={`https://openweathermap.org/img/wn/${data.icon}@2x.png`}
              alt={data.description}
              className="weather-icon"
            />
          </div>
          
          <div className="weather-temp">
            <span className="temp-value">{data.temperature}°C</span>
            <span className="temp-feels">Feels like {data.feelsLike}°C</span>
          </div>

          <div className="weather-condition">
            <p className="condition-main">{data.condition}</p>
            <p className="condition-desc">{data.description}</p>
          </div>

          <div className="weather-details">
            <div className="detail-item">
              <span className="detail-label">💧 Humidity</span>
              <span className="detail-value">{data.humidity}%</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">💨 Wind Speed</span>
              <span className="detail-value">{data.windSpeed} m/s</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherModule;
