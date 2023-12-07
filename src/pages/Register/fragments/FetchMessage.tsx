import React from 'react';
import { Text } from '@chakra-ui/react';

export default function FetchMessage({
  condition,
  message,
}: {
  condition: string;
  message: string;
}) {
  if (condition === 'success') {
    return (
      <Text textColor="green" my={2}>
        Sukses Register!
      </Text>
    );
  } else if (condition === 'failed') {
    return (
      <Text textColor="red" my={2}>
        {message}
      </Text>
    );
  } else {
    return null;
  }
}
