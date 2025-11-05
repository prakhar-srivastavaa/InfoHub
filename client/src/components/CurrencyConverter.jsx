import { useState, useEffect } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState('100');

  const fetchCurrency = async (amountValue) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:3001/api/currency?amount=${amountValue}`);
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch currency data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrency(amount);
  }, []);

  const handleConvert = (e) => {
    e.preventDefault();
    if (amount && parseFloat(amount) > 0) {
      fetchCurrency(amount);
    }
  };

  return (
    <div className="module-container">
      <h2 className="module-title">💱 Currency Converter</h2>
      
      <form onSubmit={handleConvert} className="converter-form">
        <div className="input-group">
          <label htmlFor="amount">Amount in INR (₹)</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..."
            className="amount-input"
            min="0"
            step="0.01"
          />
        </div>
        <button type="submit" className="convert-button">
          Convert
        </button>
      </form>

      {isLoading && (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading exchange rates...</p>
        </div>
      )}

      {error && (
        <div className="error-container">
          <p className="error-message">❌ {error}</p>
        </div>
      )}

      {!isLoading && !error && data && (
        <div className="currency-display">
          <div className="conversion-header">
            <p className="base-amount">₹ {data.amount} INR = </p>
            <p className="last-updated">Last updated: {data.lastUpdated}</p>
          </div>

          <div className="conversions-grid">
            <div className="conversion-card">
              <div className="currency-flag">🇺🇸</div>
              <div className="currency-info">
                <span className="currency-code">USD</span>
                <span className="currency-value">$ {data.conversions.USD}</span>
                <span className="currency-rate">Rate: {data.rates.USD}</span>
              </div>
            </div>

            <div className="conversion-card">
              <div className="currency-flag">🇪🇺</div>
              <div className="currency-info">
                <span className="currency-code">EUR</span>
                <span className="currency-value">€ {data.conversions.EUR}</span>
                <span className="currency-rate">Rate: {data.rates.EUR}</span>
              </div>
            </div>

            <div className="conversion-card">
              <div className="currency-flag">🇬🇧</div>
              <div className="currency-info">
                <span className="currency-code">GBP</span>
                <span className="currency-value">£ {data.conversions.GBP}</span>
                <span className="currency-rate">Rate: {data.rates.GBP}</span>
              </div>
            </div>

            <div className="conversion-card">
              <div className="currency-flag">🇯🇵</div>
              <div className="currency-info">
                <span className="currency-code">JPY</span>
                <span className="currency-value">¥ {data.conversions.JPY}</span>
                <span className="currency-rate">Rate: {data.rates.JPY}</span>
              </div>
            </div>

            <div className="conversion-card">
              <div className="currency-flag">🇦🇺</div>
              <div className="currency-info">
                <span className="currency-code">AUD</span>
                <span className="currency-value">A$ {data.conversions.AUD}</span>
                <span className="currency-rate">Rate: {data.rates.AUD}</span>
              </div>
            </div>

            <div className="conversion-card">
              <div className="currency-flag">🇨🇦</div>
              <div className="currency-info">
                <span className="currency-code">CAD</span>
                <span className="currency-value">C$ {data.conversions.CAD}</span>
                <span className="currency-rate">Rate: {data.rates.CAD}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
