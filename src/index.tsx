/* eslint-disable react/react-in-jsx-scope */
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import App from './App'
import store from './configStore'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'

import 'antd/dist/reset.css'
import 'react-datepicker/dist/react-datepicker.css'
import './tailwind.css'
import './styles/index.scss'
console.log('init')
console.log({ store: store.getState() })

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register()
