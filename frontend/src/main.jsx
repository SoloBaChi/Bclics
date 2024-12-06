// index.js
import  { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { QueryClientProvider , QueryClient} from 'react-query';
import theme from './theme';
import App from './App';
import './index.css';
import { AuthProvider } from './Auth/AuthContext';


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:Infinity,
      cacheTime:Infinity
    }
  }
})


const Main = () => {
  return (
  <StrictMode>
   <QueryClientProvider client={queryClient}>
   <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <AuthProvider>
          <App />
        </AuthProvider>
    </ChakraProvider>
   </QueryClientProvider>
  </StrictMode>
  )
}


const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Main/>);
