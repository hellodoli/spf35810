import React from 'react'
import { Toaster } from 'react-hot-toast'
import { HashRouter as Router } from 'react-router-dom'
import clsx from 'clsx'

import Container from 'modules/Container'
import Modals from 'modules/Modal'

function App() {
  console.log('re-render App')
  return (
    <Router>
      <div
        className={clsx(
          'App main',
          'min-h-[100vh]',
          'bg-white dark:bg-slate-900 dark:text-slate-200',
        )}
      >
        <Toaster />
        <Modals />
        <Container />
      </div>
    </Router>
  )
}

export default App
