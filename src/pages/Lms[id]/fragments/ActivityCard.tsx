import { Box, Icon, VStack, Text } from '@chakra-ui/react';
import React from 'react';
import { File } from 'react-feather';
import { isoToString } from '../../../utils/helpers/isoDateFormatter';

export default function ActivityCard({ props, className }: any) {
  
  return (
    <Box
      bg="grey_bg"
      h={20}
      w="100%"
      borderRadius="20px"
      display="flex"
      alignItems="center"
      my={4}
      py={14}
      zIndex={-99}
      justifyContent='space-between'
    >
      <Box display="flex" alignItems="center">
        <Icon
          as={File}
          w={16}
          h={16}
          m={6}
          overflow="clip"
          bg="blue"
          p={4}
          borderRadius="full"
          color="white"
        />
        <VStack alignItems="start">
          <Text as="h3" fontWeight={500} fontSize={20}>
            {props.title}
          </Text>
          <Text>{className}</Text>
        </VStack>
      </Box>
      <Text mr={10}>
        {isoToString(props.deadline)}
      </Text>
    </Box>
  );
}
