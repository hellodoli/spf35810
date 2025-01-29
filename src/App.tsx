import React from 'react'
import { Toaster } from 'react-hot-toast'
import { HashRouter as Router } from 'react-router-dom'

import Container from 'modules/Container'
import Modals from 'modules/Modal'

function App() {
  console.log('re-render App')
  return (
    <Router>
      <div className="App main">
        <Toaster />
        <Modals />
        <Container />
      </div>
    </Router>
  )
}

export default App
