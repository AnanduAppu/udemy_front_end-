import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="621276946702-4o4ko2r0akqqghf47t1hibl62ngaa0e5.apps.googleusercontent.com">
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
