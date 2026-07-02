import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { ThemeProvider } from './context/ThemeContext';

import './styles/variables.css';
import './styles/global.css';
import './styles/utilities.css';
import './styles/animations.css';

import './styles/layout.css';
import './styles/cards.css';
import './styles/buttons.css';
import './styles/forms.css';
import './styles/tables.css';
import './styles/badges.css';
import './styles/typography.css';
import './styles/landing.css';
import './index.css';
import './styles/pages.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);