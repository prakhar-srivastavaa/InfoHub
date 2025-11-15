# Weatherapp 🌐

A full-stack utility app with weather, currency converter, and quote generator.

**[🚀 Live Demo](https://info-hub-wheat.vercel.app/)**

## Features
- 🌤️ Weather Display
- 💱 Currency Converter
- ✨ Quote Generator

## Tech
React + Vite | Node.js + Express
- **OpenWeatherMap** - Real-time weather data
- **ExchangeRate-API** - Currency exchange rates
- **Quotable** - Motivational quotes

## 📁 Project Structure

```
Weatherapp/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── WeatherModule.jsx
│   │   │   ├── CurrencyConverter.jsx
│   │   │   └── QuoteGenerator.jsx
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── server/                      # Node.js Backend
    ├── server.js
    ├── package.json
    └── .env
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **OpenWeatherMap API Key** - [Get free API key](https://openweathermap.org/api)

### Installation

#### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd InfoHub
```

#### 2. Setup Backend

```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file and add your API key
# Edit the .env file and replace 'your_openweathermap_api_key_here' with your actual API key
```

**Important:** Open `server/.env` and add your OpenWeatherMap API key:
```env
WEATHER_API_KEY=your_actual_api_key_here
PORT=3001
```

#### 3. Setup Frontend

```bash
# Navigate to client directory (from root)
cd client

# Install dependencies
npm install
```

### Running the Application

You'll need two terminal windows:

#### Terminal 1: Start Backend Server
```bash
cd server
npm start
```
The server will run on `http://localhost:3001`

#### Terminal 2: Start Frontend Development Server
```bash
cd client
npm run dev
```
The React app will run on `http://localhost:5173`

### Open in Browser

Navigate to `http://localhost:5173` in your web browser.

## 🔑 Getting API Keys

### OpenWeatherMap (Required for Weather Module)

1. Visit [OpenWeatherMap](https://openweathermap.org/api)
2. Click "Sign Up" and create a free account
3. Navigate to "API keys" section in your account
4. Copy your API key
5. Paste it in `server/.env` file as `WEATHER_API_KEY=your_key_here`

**Note:** Free tier allows 60 calls/minute and 1,000,000 calls/month

### Currency & Quote APIs

The currency converter uses ExchangeRate-API's free tier (no key required for basic usage).
The quote generator uses Quotable API (completely free, no key required).

## 📱 Usage

1. **Weather Module**
   - Enter any city name in the search box
   - Click "Search" to get current weather data
   - View temperature, conditions, humidity, and wind speed

2. **Currency Converter**
   - Enter amount in INR
   - Click "Convert" to see conversions to 6 major currencies
   - View real-time exchange rates

3. **Quote Generator**
   - Click "Generate New Quote" button
   - Get inspiring quotes from famous authors
   - Click again for a new quote

## 🎨 Features Highlights

- ✅ **Single Page Application** - No page reloads
- ✅ **Loading States** - Beautiful loading spinners
- ✅ **Error Handling** - Graceful error messages
- ✅ **Responsive Design** - Works on mobile, tablet, and desktop
- ✅ **Modern UI** - Clean, professional design
- ✅ **Real-time Data** - Live API integration
- ✅ **Tab Navigation** - Easy switching between utilities
- ✅ **Accessibility** - Semantic HTML and proper contrast

## 🏗️ Build for Production

### Build Frontend
```bash
cd client
npm run build
```

The production-ready files will be in `client/dist/`

### Deploy

**Frontend (Vercel):**
1. Push code to GitHub
2. Connect repository to Vercel
3. Set build command: `cd client && npm run build`
4. Set output directory: `client/dist`

**Backend (Vercel/Railway/Heroku):**
1. Deploy the `server` directory
2. Add environment variables (WEATHER_API_KEY)
3. Update frontend API calls to use production URL

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ as part of the ByteXL Assignment

## 🙏 Acknowledgments

- OpenWeatherMap for weather data
- ExchangeRate-API for currency rates
- Quotable API for inspirational quotes
- React and Node.js communities

---

**Happy Coding! 🚀**
