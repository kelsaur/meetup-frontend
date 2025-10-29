import { useState } from 'react'
import reactLogo from './assets/react.svg'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
//Test
  return (
    <>
      <div class="flex justify-center bg-red-100">
  
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div>
        <button class="bg-blue-500 hover:bg-fuchsia-500 p-1 rounded-md" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Testing Tailwind
        </p>
      </div>
      <p>
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
