import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastProvider } from './contexts/ToastContext.tsx';
import RootApp from './RootApp.tsx';

//import NotFoundPage from './components/NotFoundPage';  // Optional: For 404 page

createRoot(document.getElementById('root')!).render(
  //<StrictMode>
  <ToastProvider>
      <RootApp />
    </ToastProvider>
  //</StrictMode>,
)
