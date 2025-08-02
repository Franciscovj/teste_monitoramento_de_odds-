import React, { useState, useEffect } from 'react';
import './OddsTable.css';
import Popup from './Popup';

const OddsTable = () => {
  const [events, setEvents] = useState([]);
  const [selectedOdd, setSelectedOdd] = useState(null);

  const mockData = [
    {
      id: 1,
      name: "Team A vs Team B",
      bookmaker: "Bookmaker1",
      markets: [
        {
          name: "Match Odds",
          odds_variations: [
            { timestamp: "2023-01-01T10:00:00Z", odds: 1.5 },
            { timestamp: "2023-01-01T11:00:00Z", odds: 1.6 },
          ],
        },
        {
          name: "BTTS",
          odds_variations: [
            { timestamp: "2023-01-01T10:00:00Z", odds: 1.8 },
            { timestamp: "2023-01-01T11:00:00Z", odds: 1.9 },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Team A vs Team B",
      bookmaker: "Bookmaker2",
      markets: [
        {
          name: "Match Odds",
          odds_variations: [
            { timestamp: "2023-01-01T10:00:00Z", odds: 1.55 },
            { timestamp: "2023-01-01T11:00:00Z", odds: 1.65 },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Team C vs Team D",
      bookmaker: "Bookmaker1",
      markets: [
        {
          name: "Over/Under 2.5 Goals",
          odds_variations: [
            { timestamp: "2023-01-01T12:00:00Z", odds: 2.0 },
            { timestamp: "2023-01-01T13:00:00Z", odds: 2.1 },
          ],
        },
      ],
    },
  ];

  useEffect(() => {
    const processedData = processData(mockData);
    setEvents(processedData);
  }, []);

  const getLatestOdd = (variations) => {
    return variations.reduce((latest, current) => {
      return new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest;
    });
  };

  const handleOddClick = (event, market, bookmaker) => {
    const originalEvent = mockData.find(e => e.name === event.name && e.bookmaker === bookmaker);
    const marketData = originalEvent.markets.find(m => m.name === market);
    setSelectedOdd({
      event,
      market,
      bookmaker,
      history: marketData.odds_variations,
    });
  };

  const processData = (data) => {
    const eventsMap = new Map();

    data.forEach(event => {
      const eventName = event.name;
      if (!eventsMap.has(eventName)) {
        eventsMap.set(eventName, {
          name: eventName,
          bookmakers: {},
        });
      }

      const eventData = eventsMap.get(eventName);
      event.markets.forEach(market => {
        if (!eventData.bookmakers[event.bookmaker]) {
          eventData.bookmakers[event.bookmaker] = {};
        }
        eventData.bookmakers[event.bookmaker][market.name] = getLatestOdd(market.odds_variations).odds;
      });
    });

    return Array.from(eventsMap.values());
  };

  const bookmakers = [...new Set(mockData.map(e => e.bookmaker))];
  const markets = [...new Set(mockData.flatMap(e => e.markets.map(m => m.name)))];

  return (
    <div className="odds-table-container">
      <h2>Latest Odds</h2>
      <table>
        <thead>
          <tr>
            <th>Event</th>
            {bookmakers.map(bm => <th colSpan={markets.length} key={bm}>{bm}</th>)}
          </tr>
          <tr>
            <th></th>
            {bookmakers.map(bm => (
              markets.map(m => <th key={`${bm}-${m}`}>{m}</th>)
            ))}
          </tr>
        </thead>
        <tbody>
          {events.map(event => (
            <tr key={event.name}>
              <td>{event.name}</td>
              {bookmakers.map(bm => (
                markets.map(m => (
                  <td
                    key={`${event.name}-${bm}-${m}`}
                    onClick={() => handleOddClick(event, m, bm)}
                    className={event.bookmakers[bm] && event.bookmakers[bm][m] ? 'clickable' : ''}
                  >
                    {event.bookmakers[bm] ? event.bookmakers[bm][m] || '-' : '-'}
                  </td>
                ))
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedOdd && (
        <Popup
          event={selectedOdd.event}
          market={selectedOdd.market}
          bookmaker={selectedOdd.bookmaker}
          history={selectedOdd.history}
          onClose={() => setSelectedOdd(null)}
        />
      )}
    </div>
  );
};

export default OddsTable;
