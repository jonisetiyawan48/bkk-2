import { Container } from '@chakra-ui/react';
import Dashboard from './fragments/Dashboard'
import { useEffect, useState } from 'react';

// Role
import { checkRole } from '../../utils/helpers/checkRole';

export default function Beranda() {
  const [unAuth, setUnAuth] = useState(false);
  const [checkAuth, setCheckAuth] = useState(false);

  useEffect(() => {
    setCheckAuth(false)
    if(!checkRole(['7', '1', '5'])){
      setUnAuth(true)
    }
    setCheckAuth(true)
    
  }, [])

  if(!checkAuth){
    return null;
  }

  return (
    <Container maxW="100%">
        <Dashboard unAuth={unAuth}/>
    </Container>
  );
}
