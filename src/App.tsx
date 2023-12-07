import './App.css';

import '@fontsource/poppins/500.css';
import '@fontsource/poppins/400.css';

import { ChakraProvider } from '@chakra-ui/react';

import { HashRouter } from 'react-router-dom';
import theme from './theme';

import Routing from './components/Routes/Routing';

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <HashRouter>
        <Routing />
      </HashRouter>
    </ChakraProvider>
  );
}


