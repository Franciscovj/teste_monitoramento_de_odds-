import React, { useEffect, useState } from 'react'
import axios from 'axios'

function OddsTable() {
  const [odds, setOdds] = useState([])
  const [filterMarket, setFilterMarket] = useState('')
  const [filterBookmaker, setFilterBookmaker] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/api/odds')
      .then(res => setOdds(res.data))
      .catch(err => console.error(err))
  }, [])

  // Filtrar odds conforme filtros selecionados
  const filteredOdds = odds.filter(odd => {
    return (filterMarket === '' || odd.market === filterMarket) &&
           (filterBookmaker === '' || odd.bookmaker === filterBookmaker)
  })

  // Para popular os selects
  const markets = [...new Set(odds.map(o => o.market))]
  const bookmakers = [...new Set(odds.map(o => o.bookmaker))]

  return (
    <div>
      <div className="mb-4 flex gap-4">
        <select value={filterMarket} onChange={e => setFilterMarket(e.target.value)} className="border p-2 rounded">
          <option value=''>Todos os Mercados</option>
          {markets.map(m => <option key={m} value={m}>{m}</option>)}
        </select>

        <select value={filterBookmaker} onChange={e => setFilterBookmaker(e.target.value)} className="border p-2 rounded">
          <option value=''>Todas as Casas</option>
          {bookmakers.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Evento</th>
            <th className="border border-gray-300 p-2">Casa</th>
            <th className="border border-gray-300 p-2">Mercado</th>
            <th className="border border-gray-300 p-2">Home</th>
            <th className="border border-gray-300 p-2">Draw</th>
            <th className="border border-gray-300 p-2">Away</th>
            <th className="border border-gray-300 p-2">Data</th>
          </tr>
        </thead>
        <tbody>
          {filteredOdds.map((odd, idx) => (
            <tr key={idx} className="text-center">
              <td className="border border-gray-300 p-2">{odd.event}</td>
              <td className="border border-gray-300 p-2">{odd.bookmaker}</td>
              <td className="border border-gray-300 p-2">{odd.market}</td>
              <td className="border border-gray-300 p-2">{odd.odds.home}</td>
              <td className="border border-gray-300 p-2">{odd.odds.draw}</td>
              <td className="border border-gray-300 p-2">{odd.odds.away}</td>
              <td className="border border-gray-300 p-2">{new Date(odd.timestamp).toLocaleString()}</td>
            </tr>
          ))}
          {filteredOdds.length === 0 && (
            <tr>
              <td colSpan="7" className="p-4">Nenhum registro encontrado.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default OddsTable
