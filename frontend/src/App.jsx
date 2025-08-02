import React from 'react'
import OddsTable from './components/OddsTable'

function App() {
  return (
    <div className="p-4 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Comparativo de Odds</h1>
      <OddsTable />
    </div>
  )
}

export default App
