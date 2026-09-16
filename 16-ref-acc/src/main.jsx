import { createRoot } from 'react-dom/client'
import './app/App.css'
import App from './app/App.jsx'
import AuthProvider from './modules/auth/context/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(<AuthProvider><App/></AuthProvider>)
