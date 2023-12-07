import { Box } from '@chakra-ui/react';
import { AnimatePresence } from 'framer-motion';
import { Route, Routes } from 'react-router-dom';
import LandingPage from '../../pages/LandingPage/LandingPage';
import Login from '../../pages/Login/Login';
import NotFound from '../../pages/NotFound/NotFound';
import Register from '../../pages/Register/Register';
import MainRoute from './MainRoute';


export default function Routing() {
  return (
    <AnimatePresence exitBeforeEnter>
      <Box width="100vw" overflowX="hidden">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/main/*" element={<MainRoute />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>
    </AnimatePresence>
  );
}
