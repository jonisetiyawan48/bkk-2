import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { Home, Phone } from 'react-feather';

export default function AboutBox({
  name, address, agency, phoneNumber,
}: {
  name: string;
  address: string;
  agency: string;
  phoneNumber: string;
}) {
  return (
    <Box bg="white" w={{ base: "100%", md: "400px" }} p={8} rounded={20} mt={-20}>
      <Text as="h6" fontWeight={500} display="flex" dir="row" gap={2}>
        <Home /> Instanti di {agency ? agency : '-'}
      </Text>
      <Text as="h6" fontWeight={500} display="flex" dir="row" gap={2} my={6}>
        <Home />
        Tinggal di {address ? address : '-'}
      </Text>
      <Text as="h6" fontWeight={500} display="flex" dir="row" gap={2}>
        <Phone />
        {phoneNumber ? phoneNumber : '-'}
      </Text>
    </Box>
  );
}
