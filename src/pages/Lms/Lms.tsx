import { Container, Grid, GridItem, Heading } from '@chakra-ui/react';
import React from 'react';
import CourseCard from './fragments/CourseCard';
import Loader from './Loader';

export default function Lms() {
  return (
    <Container maxW="100%" p={0} gridTemplateRows="repeat(2, 1fr)">
      <Heading>Daftar Course</Heading>
      <Grid templateColumns="repeat(3, 1fr)" my={5}>
        <GridItem colSpan={2}>
          <Grid templateColumns="repeat(2, 1fr)" gap={4}>
            <Loader />
          </Grid>
        </GridItem>
      </Grid>
    </Container>
  );
}
