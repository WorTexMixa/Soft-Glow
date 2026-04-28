import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <h1>Soft Glow</h1>
      <p>Малон краси</p>
      <button>Записатись</button>
    </div>
  )
}

export default App
