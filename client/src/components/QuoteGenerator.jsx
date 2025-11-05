import { useState } from 'react';
import axios from 'axios';

const QuoteGenerator = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchQuote = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get('http://localhost:3001/api/quote');
      setData(response.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch quote');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="module-container">
      <h2 className="module-title">✨ Motivational Quote Generator</h2>
      
      <div className="quote-section">
        <button 
          onClick={fetchQuote} 
          className="generate-button"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : '🎲 Generate New Quote'}
        </button>

        {isLoading && (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Fetching inspiration...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p className="error-message">❌ {error}</p>
          </div>
        )}

        {!isLoading && !error && data && (
          <div className="quote-display">
            <div className="quote-mark opening">"</div>
            <blockquote className="quote-content">
              {data.content}
            </blockquote>
            <div className="quote-mark closing">"</div>
            <p className="quote-author">— {data.author}</p>
          </div>
        )}

        {!isLoading && !error && !data && (
          <div className="quote-placeholder">
            <p>Click the button above to generate an inspiring quote!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuoteGenerator;
