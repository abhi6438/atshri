import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './styles/global.css';
import App from './App';

try {
  const t = localStorage.getItem('atshri.theme.v2');
  document.documentElement.setAttribute('data-theme', t === 'light' ? 'light' : 'dark'); // dark by default
} catch {
  document.documentElement.setAttribute('data-theme', 'dark');
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
