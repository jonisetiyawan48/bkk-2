import { HStack, VStack, Image, Text, Spinner } from '@chakra-ui/react';
import React from 'react';
import { yangLalu } from '../../../utils/helpers/unixToString';

export default function BlogUser({
  name,
  date,
}: {
  name: string;
  date: string;
}) {
  return (
    <HStack alignItems="center">
      <VStack align="start" gap={-2}>
        <Text fontWeight={500}>{name}</Text>
        <Text style={{ marginTop: 0 }} color="grey" fontWeight={300}>
          {yangLalu(date)}
        </Text>
      </VStack>
    </HStack>
  );
}
