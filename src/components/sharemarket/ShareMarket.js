// src/StockMarketApp.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StockMarketApp.css'
const StockMarketApp = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=IBM&apikey=demo`;

    axios
      .get(apiUrl)
      .then((response) => {
        // Assuming the data is nested under 'Monthly Time Series'
        const timeSeriesData = response.data['Monthly Time Series'];
        const dataPoints = [];

        for (const date in timeSeriesData) {
          if (timeSeriesData.hasOwnProperty(date)) {
            const data = timeSeriesData[date];
            dataPoints.push({ date, ...data });
          }
        }

        setStockData(dataPoints);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [symbol]);

  return (
    <div className="stock-app-container">
    <h1 className="stock-app-header">Stock Market App</h1>
    <div className="input-section">
      <label htmlFor="symbol">Stock Symbol:</label>
      <input
        type="text"
        id="symbol"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
      />
    </div>
    {stockData.length > 0 ? (
      <div className="data-section">
        {stockData.map((dataPoint, index) => (
          <div key={index}>
            <p>Date: {dataPoint.date}</p>
            <p>Open: {dataPoint['1. open']}</p>
            <p>High: {dataPoint['2. high']}</p>
            <p>Low: {dataPoint['3. low']}</p>
            <p>Close: {dataPoint['4. close']}</p>
            <p>Volume: {dataPoint['5. volume']}</p>
          </div>
        ))}
      </div>
    ) : (
      <p>Loading stock data...</p>
    )}
  </div>
  
  );
};

export default StockMarketApp;
