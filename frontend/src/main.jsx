// index.js
import  { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import theme from './theme';
import App from './App';
import './index.css';
import { AuthProvider } from './Auth/AuthContext';
AuthProvider

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <AuthProvider>
            <App />
          </AuthProvider>
      </ChakraProvider>
  </StrictMode>
);
