// src/StockMarketApp.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StockMarketApp = () => {
  const [symbol, setSymbol] = useState('AAPL'); // Default stock symbol is AAPL
  const [stockData, setStockData] = useState(null);

  useEffect(() => {
    const apiKey = 'WA71OD0SUMQLQV08'; // Replace with your Alpha Vantage API key
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;

    axios.get(apiUrl)
      .then(response => {
        setStockData(response.data['Time Series (5min)']);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [symbol]);

  return (
    <div>
      <h1>Stock Market App</h1>
      <label htmlFor="symbol">Stock Symbol:</label>
      <input
        type="text"
        id="symbol"
        value={symbol}
        onChange={e => setSymbol(e.target.value)}
      />
      {stockData ? (
        <div>
          <h2>Stock Data for {symbol}</h2>
          <pre>{JSON.stringify(stockData, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading stock data...</p>
      )}
    </div>
  );
};

export default StockMarketApp;
