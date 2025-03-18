import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AppContextProvider } from './context/AppContext.jsx'
// Import i18n
import './i18n.js'

// Configure future flags for React Router v7 compatibility
const browserRouterOptions = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

const root = createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Suspense fallback={<div>Loading translations...</div>}>
      <BrowserRouter {...browserRouterOptions}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </BrowserRouter>
    </Suspense>
  </React.StrictMode>
)
