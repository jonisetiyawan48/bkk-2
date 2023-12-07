import { Container } from '@chakra-ui/react';
import React from 'react';
import Navbar from './fragments/Navbar';
import HeroSection from './sections/HeroSection';
import Background from '../../assets/vectors/bg-landing.svg';
import AboutSection from './sections/AboutSection';
import SpacerDecor from './fragments/SpacerDecor';
import StatSection from './sections/StatSection';
import NewsSection from './sections/NewsSection';
import FooterSection from './sections/FooterSection';
import { isLogged } from '../../utils/helpers/isLogged';
import { Navigate } from 'react-router-dom';

export default function LandingPage() {
  const logged = isLogged();

  if (logged) {
    return <Navigate to={'/main/beranda'} />;
  }
  return (
    <>
      <Navbar />
      <Container
        maxW="100%"
        backgroundImage={Background}
        backgroundRepeat="no-repeat"
        backgroundSize="100%"
      >
        <HeroSection />
        <SpacerDecor />
        <AboutSection />
        <StatSection />
        <NewsSection />
        <FooterSection />
      </Container>
    </>
  );
}
