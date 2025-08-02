import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'  // Importando Tailwind CSS
//import './index.css'  // se você tiver estilos, se não, pode remover essa linha

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
