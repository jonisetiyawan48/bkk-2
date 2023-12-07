import { Box, Flex, IconButton, Input, InputGroup, InputRightElement, Show, Spacer, useDisclosure } from '@chakra-ui/react';
import { IoMdMenu, IoMdPower } from 'react-icons/io';

import React from 'react';
import UserPill from './UserPill';
import ModalLogout from './ModalLogout';
import useScrollPosition from '../../../utils/hooks/useScrollPosition';
import { Link } from 'react-router-dom';
import { Search } from 'react-feather';

type TopNavbarType = {
  sidebar: () => void;
};

export default function TopNavbar({sidebar}:TopNavbarType) {
  const scrollPosition = useScrollPosition();
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        w="calc(100vw-300px)"
        h="100px"
        width="100%"
        bg="grey_bg"
        as="nav"
        display="flex"
        alignItems="center"
        justifyContent="end"
        px={{base: 5, sm: 10, lg: 14}}
        pos="sticky"
        top={0}
        zIndex={1}
        boxShadow={scrollPosition > 0 ? 'md' : undefined}
        transition="box-shadow 200ms"
      >
        {/* <Box>Search</Box> */}
        <Flex w="100%" gap={3} justifyContent="space-between">
          <Flex alignItems="center" gap={{base: 2, lg: 4}} flex={1}>
            <Show below="lg">
              <IconButton
                icon={<IoMdMenu size="30px" />}
                aria-label="hamburger"
                bg="grey_bg"
                borderRadius="full"
                onClick={() => sidebar()}
              />
            </Show>
            {/* <Box flex={{base: 1, lg: "unset"}}>
              <InputGroup size="lg">
                <Input
                  id="password"
                  type="text"
                  placeholder="Search"
                  borderRadius="full"
                  height="45.98px"
                  focusBorderColor="red_darker"
                  border="none"
                  bg="white"
                  required
                />
                <InputRightElement pr={3}>
                  <IconButton
                    borderRadius="full"
                    size="24px"
                    variant="ghost"
                    aria-label={'whod hide'}
                    icon={<Search />}
                    color="red_darker"
                    _hover={{bg:"white"}}
                    onClick={() => {}}
                  />
                </InputRightElement>
              </InputGroup>
            </Box> */}
          </Flex>
          <Flex alignItems="center" gap={{base: 2, lg: 4}}>
            <Link to="user-profile">
              <UserPill />
            </Link>
            <IconButton
              icon={<IoMdPower size="30px" />}
              aria-label={'logout'}
              bg="grey_bg"
              borderRadius="full"
              onClick={onOpen}
            />
          </Flex>
        </Flex>
      </Box>
      <ModalLogout isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
    </>
  );
}
