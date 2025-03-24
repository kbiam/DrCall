import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const client_ID =  "438282206464-26elvm4ohrdfp08edht2jag8b91d1ugd.apps.googleusercontent.com"
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={client_ID}>
    <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
