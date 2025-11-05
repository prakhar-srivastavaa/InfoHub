import { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('weather');

  const tabs = [
    { id: 'weather', label: '🌤️ Weather', icon: '🌍' },
    { id: 'currency', label: '💱 Currency', icon: '💰' },
    { id: 'quote', label: '✨ Quotes', icon: '📝' }
  ];

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1 className="app-title">
            <span className="title-icon"><img src="/infoHub-logo.jpg" alt="InfoHub logo" style={{ width: 34, height: 34}} /></span>
            InfoHub
          </h1>
          <p className="app-subtitle">Your everyday utilities in one place</p>
        </div>
      </header>

      <nav className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
      </nav>

      <main className="app-main">
        <div className="content-wrapper">
          {activeTab === 'weather' && <WeatherModule />}
          {activeTab === 'currency' && <CurrencyConverter />}
          {activeTab === 'quote' && <QuoteGenerator />}
        </div>
      </main>

      <footer className="app-footer">
        <p>Built with React & Node.js | InfoHub © 2025</p>
      </footer>
    </div>
  );
}

export default App;
