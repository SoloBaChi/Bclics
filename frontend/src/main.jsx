// index.js
import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import theme from './theme';
import App from './App';
import './index.css';
import { AuthProvider } from './Auth/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <StrictMode>
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <BrowserRouter>
          <AuthProvider>
            <App />
          </AuthProvider>
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  </StrictMode>
);
