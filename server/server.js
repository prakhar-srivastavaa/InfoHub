const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Mock quotes data (fallback if external API fails)
const mockQuotes = [
  {
    content: "The only way to do great work is to love what you do.",
    author: "Steve Jobs"
  },
  {
    content: "Innovation distinguishes between a leader and a follower.",
    author: "Steve Jobs"
  },
  {
    content: "Strive not to be a success, but rather to be of value.",
    author: "Albert Einstein"
  },
  {
    content: "The future belongs to those who believe in the beauty of their dreams.",
    author: "Eleanor Roosevelt"
  },
  {
    content: "It is during our darkest moments that we must focus to see the light.",
    author: "Aristotle"
  },
  {
    content: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    content: "The only impossible journey is the one you never begin.",
    author: "Tony Robbins"
  },
  {
    content: "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    author: "Winston Churchill"
  }
];

// API Routes

// 1. Quote Generator API
app.get('/api/quote', async (req, res) => {
  try {
    // Try to fetch from external API first
    const response = await axios.get('https://api.quotable.io/random');
    res.json({
      content: response.data.content,
      author: response.data.author
    });
  } catch (error) {
    // Fallback to mock data if external API fails
    console.error('External quote API failed, using mock data:', error.message);
    const randomQuote = mockQuotes[Math.floor(Math.random() * mockQuotes.length)];
    res.json(randomQuote);
  }
});

// 2. Weather API
app.get('/api/weather', async (req, res) => {
  try {
    const city = req.query.city || 'Hyderabad';
    const apiKey = process.env.WEATHER_API_KEY;
    
    if (!apiKey || apiKey === 'your_openweathermap_api_key_here') {
      return res.status(400).json({ 
        error: 'Weather API key not configured. Please add your OpenWeatherMap API key to the .env file.' 
      });
    }

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await axios.get(weatherUrl);

    res.json({
      city: response.data.name,
      country: response.data.sys.country,
      temperature: Math.round(response.data.main.temp),
      feelsLike: Math.round(response.data.main.feels_like),
      condition: response.data.weather[0].main,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      windSpeed: response.data.wind.speed,
      icon: response.data.weather[0].icon
    });
  } catch (error) {
    console.error('Weather API Error:', error.message);
    if (error.response) {
      res.status(error.response.status).json({ 
        error: `Could not fetch weather data: ${error.response.data.message || 'Unknown error'}` 
      });
    } else {
      res.status(500).json({ 
        error: 'Could not fetch weather data. Please check your API key and try again.' 
      });
    }
  }
});

// 3. Currency Converter API
app.get('/api/currency', async (req, res) => {
  try {
    const amount = parseFloat(req.query.amount) || 1;
    
    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ 
        error: 'Invalid amount. Please provide a valid positive number.' 
      });
    }

    // Using exchangerate-api.com (free tier, no API key required for basic usage)
    const currencyUrl = 'https://api.exchangerate-api.com/v4/latest/INR';
    const response = await axios.get(currencyUrl);

    const rates = response.data.rates;
    
    res.json({
      base: 'INR',
      amount: amount,
      conversions: {
        USD: (amount * rates.USD).toFixed(2),
        EUR: (amount * rates.EUR).toFixed(2),
        GBP: (amount * rates.GBP).toFixed(2),
        JPY: (amount * rates.JPY).toFixed(2),
        AUD: (amount * rates.AUD).toFixed(2),
        CAD: (amount * rates.CAD).toFixed(2)
      },
      rates: {
        USD: rates.USD.toFixed(4),
        EUR: rates.EUR.toFixed(4),
        GBP: rates.GBP.toFixed(4),
        JPY: rates.JPY.toFixed(4),
        AUD: rates.AUD.toFixed(4),
        CAD: rates.CAD.toFixed(4)
      },
      lastUpdated: response.data.date
    });
  } catch (error) {
    console.error('Currency API Error:', error.message);
    res.status(500).json({ 
      error: 'Could not fetch currency data. Please try again later.' 
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'InfoHub API is running',
    timestamp: new Date().toISOString()
  });
});



// Start server
app.listen(PORT, () => {
  console.log(`🚀 InfoHub Server is running on port ${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
  console.log(`\nAvailable endpoints:`);
  console.log(`  - GET /api/health`);
  console.log(`  - GET /api/quote`);
  console.log(`  - GET /api/weather?city=<cityname>`);
  console.log(`  - GET /api/currency?amount=<amount>`);
});

module.exports = app;
