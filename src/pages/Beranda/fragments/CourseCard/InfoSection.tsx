import { VStack, Text, Box, Heading, Badge, Flex } from '@chakra-ui/react';

import ColorValues from '../../../../components/badgecolorvalues.json';

import React from 'react';
import { getDate } from '../../../../utils/helpers/unixToString';
import { isoToString } from '../../../../utils/helpers/isoDateFormatter';

type infoType = {
  lecturer: string;
  title: string | any;
  tag: 'muatan nasional' | 'rekayasa perangkat lunak' | 'wawasan umum';
  startdate: string;
  enddate: string;
};

export default function InfoSection({
  lecturer,
  title,
  startdate,
  enddate,
  tag,
}: infoType) {
  return (
    <Flex
      w="50%"
      gap={4}
      flexDir="column"
      justifyContent="space-between"
      alignItems="start"
      p={2}
    >
      <Box>
        <Text
          noOfLines={1}
          color="grey"
          fontWeight={400}
          as="h6"
          transform="capitalize"
        >
          {lecturer}
        </Text>

        <Heading noOfLines={1} fontSize={24}>
          {title}
        </Heading>
      </Box>

      <Badge
        objectFit="contain"
        textTransform="capitalize"
        fontSize={17}
        px={2}
        py={2}
        borderRadius="2xl"
        fontWeight={500}
        {...ColorValues[tag]}
      >
        {tag}
      </Badge>
      <Box>
        {isoToString(startdate)} - {isoToString(enddate)}
      </Box>
    </Flex>
  );
}
