import { Container, Grid, GridItem, Image, Center } from '@chakra-ui/react';
import LoginImage from '../../assets/vectors/login-image.svg';
import React from 'react';
import { useLocation } from 'react-router-dom';

export default function Login() {
  const location = useLocation();

  return (
    <Container maxW="80%" gridTemplateRows="repeat(2, 1fr)" py={14} p={0}>
      <Center>
        <Grid
          gap={90}
          w='100%'
          templateColumns="repeat(2, 1fr)"
          justifyContent="center"
        >
          <GridItem margin="auto 0">
           404 Not Found
          </GridItem>
          <GridItem margin="auto auto">
            coba cek kembali url yang anda ketik
          </GridItem>
        </Grid>
      </Center>
    </Container>
  );
}
