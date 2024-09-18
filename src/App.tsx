import React from 'react'
// import history from 'utils/history'
import { HashRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

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
