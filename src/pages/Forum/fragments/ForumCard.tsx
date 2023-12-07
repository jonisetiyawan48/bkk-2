import { Box, Divider, Image, Text } from '@chakra-ui/react';
import React from 'react';
import ForumInfo from './ForumInfo';
import ForumUser from './ForumUser';

type forumCardType = {
  createdAt: string;
  description: string;
  image: {
    url: string;
    key: string;
  };
  createdBy: string;
  forumId: string;
};

export default function ForumCard({
  createdAt,
  description,
  image,
  createdBy,
  forumId,
}: forumCardType) {
  return (
    <Box w="60%" bg="white" borderRadius="xl">
      <ForumInfo forumId={forumId} />
      <Divider w='95%' m='0 auto'/>
      <Box bgColor="white" borderRadius="3xl" pb={10}>
        <ForumUser id={createdBy} date={createdAt} />
        <Divider w='95%' m='0 auto'/>
        <Text px={6} my={4}  overflow="hidden">
          {description}
        </Text>
        <Box
          justifyContent="center"
          display="flex"
          h="450px"
          cursor="pointer"
          transition="200ms"
          // onClick={onOpen}
          bg={`url(${image.url})`}
        >
          <Box
            display="flex"
            w="100%"
            h="100%"
            backdropFilter="auto"
            backdropBlur="10px"
            alignItems="center"
            justifyContent="center"
          >
            <Image
              maxW="100%"
              maxH="450px"
              src={image.url}
              objectFit="contain"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
