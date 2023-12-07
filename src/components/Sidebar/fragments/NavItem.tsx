import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

type NavItemsType = {
  title: string;
  icon: any;
  path: string;
};

export default function NavItem({ title, icon, path }: NavItemsType) {
  const location = useLocation();
  const active = path == '/main/' + location.pathname.split("/")[2];
  return (
    <Link to={path}>
      <Button
        transition="200ms"
        my={1}
        fontWeight={500}
        py={6}
        justifyContent="start"
        alignItems='center'
        width="100%"
        colorScheme={active ? 'red_lighter' : undefined}
        bg={active ? 'red_lighter' : 'white'}
        borderRadius="22px"
      >
        {icon ? <Icon as={icon} mr="5%" /> : null}
        {title}
      </Button>
    </Link>
  );
}
