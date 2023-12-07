import { Box, Container, Flex, IconButton, Show, Text, useDisclosure } from '@chakra-ui/react';
import AppIcon from '../../../components/AppIcon';
import { NavLink } from 'react-router-dom';
import NavButtons from './NavButtons';
import React from 'react';
import useScrollPosition from '../../../utils/hooks/useScrollPosition';
import { IoMdMenu } from 'react-icons/io';

export default function Navbar() {
  const currentPos = useScrollPosition();
  let menu = useDisclosure();

  return (
    <Box
      backgroundColor={currentPos > 300 ? "red_darker" : undefined}
      textColor="white"
      position="fixed"
      as="nav"
      w="100%"
      zIndex={999}
      css={{ backdropFilter: "blur(5px)" }}
    >
      <Container
        display="flex"
        maxW={{ base: "100%", md: "80%" }}
        px={{base: 0, lg: 3}}
        alignItems="center"
        justifyContent="space-between"
        transition='500ms'
        h={{base: "unset", md: currentPos > 300 ? 'unset' : '200px'}}
      >
        <Flex 
          flexDir={{base: "column", md: "row"}} 
          w="100%" 
          justifyContent="space-between"
          position="relative"
        >
          <Flex 
            alignItems="center" 
            justifyContent="space-between"
            bg={{ base:"red_darker", md: "unset"}}
            zIndex={2}
            py={3}
            px={4}
          >
            <Flex alignItems="center">
              <Show below="md">
                <IconButton
                  icon={<IoMdMenu size="30px" />}
                  aria-label="hamburger"
                  bg="transparent"
                  _hover={{ bg: "red.600" }}
                  borderRadius="full"
                  onClick={() => menu.onToggle()}
                />
              </Show>
              <NavLink to="/">
                <Box
                  flexDirection="row"
                  display="flex"
                  alignItems="center"
                  fontSize={{ base: 16, md: 20 }}
                  fontWeight={600}
                  letterSpacing={1}
                >
                  <AppIcon m={3} height={{base: 7, md: 8}} />
                  Platform SMK TKJ
                </Box>
              </NavLink>
            </Flex>

            {/* Login Button */}
            <Box display={{base: "none", sm: "block", md: "none"}}>
              <NavButtons name="Login"/>
            </Box>
          </Flex>
          <Flex 
            flexDirection={{ base: "column", sm: "row" }}
            alignItems="center" 
            justifyContent={{ base: "center", md: "flex-end" }}
            position={{ base: "absolute", md:"unset" }}
            top={menu.isOpen ? "100%" : "-145%" }
            // top="-100%"
            py={3}
            bg={{ base:"red_darker", md: "unset"}}
            w={{ base: "100%", md: "unset" }}
            css={{ transition: "all 0.5s ease" }}
            zIndex={1}
          >
            <NavButtons name="Beranda" path={'hero-section'}/>
            <NavButtons name="Tentang" path={'about-section'}/>
            {/* <NavButtons name="Berita" path={'news-section'}/> */}
            <NavButtons name="Kontak" path={'footer-section'}/>
            
            {/* Login Button */}
            <Box display={{base: "block", sm:"none", md:"block"}}>
              <NavButtons name="Login"/>
            </Box>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
