import { Box, Text } from '@chakra-ui/react';

import React from 'react';
import { NavLink } from 'react-router-dom';
import { Link } from 'react-scroll';

type ThisPropsType = {
  name: string;
  path?: string;
};

export const NavButtons = ({ name, path }: ThisPropsType) => {
  if (name == "Login") return (
    <Box
      borderRadius={10}
      bgColor="white"
      p={2}
      mx={2}
      fontWeight={600}
    >
      <NavLink to="/login">
        <Text color="red" px={5}>
          Login
        </Text>
      </NavLink>
    </Box>
  );
  
  return (
    <Box
      borderRadius={10}
      p={2}
      mx={2}
      fontWeight={500}
    >
      <Box cursor="pointer">
        <Link to={path ?? ""} smooth={true}>
          <Text>
            {name}
          </Text>
        </Link>
      </Box>
    </Box>
  );
};

export default NavButtons;
