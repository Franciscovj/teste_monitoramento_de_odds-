import React from 'react';
import './Popup.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Popup = ({ event, market, bookmaker, history, onClose }) => {
  if (!history) {
    return null;
  }

  const data = history.map(item => ({
    time: new Date(item.timestamp).toLocaleTimeString(),
    odds: item.odds,
  }));

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>{event.name}</h2>
        <h3>{market} - {bookmaker}</h3>
        <div style={{ width: '100%', height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis domain={['dataMin - 0.1', 'dataMax + 0.1']} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="odds" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Popup;
