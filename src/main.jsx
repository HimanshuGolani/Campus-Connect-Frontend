import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ApplicationContextProvider } from './context/ApplicationContext';  
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApplicationContextProvider>  
      <App />
    </ApplicationContextProvider>
  </StrictMode>
);
