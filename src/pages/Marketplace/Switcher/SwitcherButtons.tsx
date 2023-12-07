import { Button, Icon } from '@chakra-ui/react';
import React from 'react';

type switcherButtonsType = {
  title: string;
  value: string;
  stateValue: string;
  handleValue: Function;
  icon:any
};

export default function SwitcherButtons({
  title,
  value,
  stateValue,
  handleValue,
  icon,
}: switcherButtonsType) {
  const active = value === stateValue;

  return (
    <Button
      w={60}
      p={6}
      bg={active ? 'red_darker' : undefined}
      color={active ? 'white' : undefined}
      colorScheme={active ? 'red' : undefined}
      fontWeight={500}
      borderRadius="20px"
      justifyContent="start"
      gap={3}
      onClick={() => handleValue(value)}
      my={1}
    >
      <Icon as={icon} size={44} />
      {title}
    </Button>
  );
}
