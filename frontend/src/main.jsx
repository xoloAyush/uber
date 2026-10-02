import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/userContext.jsx'
import { CaptainProvider } from './context/captainContext.jsx'
import { ToastContainer } from 'react-toastify'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CaptainProvider>
      <UserProvider>
        <App />
        <ToastContainer />
      </UserProvider>
    </CaptainProvider>
  </BrowserRouter>,
)
