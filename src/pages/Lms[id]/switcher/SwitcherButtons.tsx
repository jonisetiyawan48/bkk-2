import { Box, Button, Flex } from '@chakra-ui/react';
import React from 'react';

export default function SwitcherButtons({ stateValue, setValue, value }: any) {
  const active = stateValue === value;

  return (
    <Box>
      <Button
        fontWeight={500}
        textTransform="capitalize"
        variant="ghost"
        borderRadius="none"
        display="flex"
        flexDir="column"
        onClick={() => setValue(value)}
        _focus={{outline:'none'}}
      >
        {value}
      </Button>
      <Box h='2px' bg={active ? 'red' : undefined} w="full" transition='200ms'/>
    </Box>
  );
}
