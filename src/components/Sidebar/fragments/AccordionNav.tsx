import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

type AccordionNavsType = {
  title: string;
  path: string;
};

export default function AccordionNav({ title, path }: AccordionNavsType) {
  const location = useLocation();
  const active = path == location.pathname;

  return (
    <NavLink to={path}>
      <Button
        transition="200ms"
        my={1}
        fontWeight={500}
        py={6}
        justifyContent="start"
        width="100%"
        bg="white"
        borderRadius="22px"
        color={active ? 'red' : undefined}
      >
        {title}
      </Button>
    </NavLink>
  );
}
