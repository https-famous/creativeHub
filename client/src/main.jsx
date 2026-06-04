import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(      // createRoot() tells react Start managing this part of the HTML as a React app
  <StrictMode>                                           
    <App />
  </StrictMode>,
)                                                         //finds the id="root" in index.html .render() this means show something inside the root 
                                                          // stricit mode wrapper What this does It wraps your app in a development checker:

