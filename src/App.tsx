import React from 'react'
import { Toaster } from 'react-hot-toast'
import { HashRouter as Router } from 'react-router-dom'

import Container from 'modules/Container'

function App() {
  console.log('re-render App')
  return (
    <Router>
      <div className="App main">
        <Toaster />
        <Container />
      </div>
    </Router>
  )
}

export default App
