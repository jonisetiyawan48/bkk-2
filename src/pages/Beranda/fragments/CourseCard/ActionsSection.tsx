import {
  Badge,
  Icon,
  Box,
  Flex,
  Heading,
  Text,
  Button,
  HStack,
  VStack,
} from '@chakra-ui/react';
import React from 'react';

import { Users } from 'react-feather';
import { Link } from 'react-router-dom';
import { USER_ROLE } from '../../../../utils/constants';

export default function ActionsSection({
  totalMembers,
  classId,
}: {
  totalMembers: number;
  classId: string;
}) {
  return (
    <Flex
      w="20%"
      gap={4}
      flexDir="column"
      justifyContent="space-between"
      alignItems="center"
      p={2}
    >
      <Text noOfLines={1} fontWeight={400} as="h6">
        <Icon as={Users} mr={3} />
        {totalMembers} peserta
      </Text>
      <VStack>
        {USER_ROLE === '3' && (
          <Text as="h6" fontSize={15} color="red_darker">
            Belum Bergabung
          </Text>
        )}
        <Link to={`../lms/${classId}`}>
          <Button
            py={7}
            fontWeight={400}
            borderRadius="full"
            colorScheme="red"
            shadow="0 0 20px rgba(231, 0, 0, 10%)"
          >
            Detail Course
          </Button>
        </Link>
      </VStack>
    </Flex>
  );
}
