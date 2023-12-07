import { Box, Divider, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { USERS_LIST_ROLES } from '../../../utils/constants';

type activeUsersItems = {
  name: string;
  roles: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  imageUrl?: string;
};

export default function ActiveUsersItems({ name, roles, imageUrl }: activeUsersItems) {
  return (
    <>
      <Box my={4} display="flex" flexDir="row" alignItems="center" gap={4}>
        <Image
          src={imageUrl ? imageUrl : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"}
          w="50px"
          h="50px"
          borderRadius="full"
        />
        <VStack alignItems="start">
          <Text fontWeight={500} as="h6" noOfLines={1}>
            {name}
          </Text>
          <Text fontWeight={300} as="h6" color="grey">
            {USERS_LIST_ROLES[roles]?.label}
          </Text>
        </VStack>
      </Box>
      <Divider variant="dashed" />
    </>
  );
}
