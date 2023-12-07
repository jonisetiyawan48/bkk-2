import React from 'react';
import ProfileImage from '../../../assets/images/profile-image.png';
import { Flex, Image, Show } from '@chakra-ui/react';
import { LOCAL_STORAGE_USER } from '../../../utils/constants';
import { getLocalStorage } from '../../../utils/helpers/localstorage';

export default function UserPill() {
  const user = getLocalStorage(LOCAL_STORAGE_USER);
  const imageUrl = user.imageUrl
  return (
    <Flex
      as="button"
      borderRadius="full"
      bgColor="red.100"
      px={4}
      py={2}
      gap={4}
      color="red_darker"
      alignItems="center"
      fontWeight={500}
      transition="200ms"
      _hover={{ bgColor: 'red.200' }}
      onClick={() => {}}
    >
      <Image src={imageUrl ? imageUrl : ProfileImage} w="30px" h="30px" borderRadius="full" />
      <Show above="md">{user.name}</Show>
    </Flex>
  );
}
