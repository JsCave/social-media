import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {HeroUIProvider,ToastProvider} from "@heroui/react";
import AuthContextProvider from './contexts/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <AuthContextProvider>
      <ToastProvider />
    <App />
    </AuthContextProvider>
    </HeroUIProvider>
  </StrictMode>,
)
