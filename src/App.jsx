import { useState } from 'react'
import './App.css'
import PedidoCompra from './pages/PedidoCompra'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <PedidoCompra/>
    </>
  )
}

export default App
