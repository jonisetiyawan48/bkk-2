import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  HStack,
  Icon,
  Image,
  Progress,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/react';

import { Users, PlusCircle } from 'react-feather';
import React, { useEffect, useState } from 'react';
import ForumCardNoInfo from './fragments/ForumCardNoInfo';
import { useParams } from 'react-router-dom';
import { fetchForumDetailById, fetchPostById } from './api/apihandler';

export let loadCurrentForumPost: Function;
export let loadForum: Function;

export default function ForumDetail() {
  const currentForumId = useParams();

  const [postLoad, setPostLoad] = useState(true);
  const [posts, setPosts] = useState([]);

  const [pageLoad, setPageLoad] = useState(true);
  const [forumDetail, setForumDetail] = useState({
    image: {
      url: '',
    },
    description: '',
    name: '',
    totalMembers: 0,
  });

  loadCurrentForumPost = async () => {
    await fetchPostById(currentForumId.forumId!)
      .then((data) => setPosts(data))
      .then(() => setPostLoad(false));
  };

  loadForum = async () => {
    await fetchForumDetailById(currentForumId.forumId!)
      .then((data) => setForumDetail(data))
      .then(() => setPageLoad(false))
      .then(() => loadCurrentForumPost());
  };

  useEffect(() => {
    loadForum();
  }, []);

  if (pageLoad) return <Progress colorScheme="red" size="xs" isIndeterminate />;

  return (
    <Container maxW="1400px" py={4}>
      <Box bg="white" borderRadius="20px" p={8}>
        <Image
          src={forumDetail.image.url}
          height="280px"
          w="full"
          objectFit="cover"
          borderRadius="20px"
        />
        <HStack pt={4} justifyContent="space-between">
          <VStack alignItems="start">
            <Heading fontSize={24}>{forumDetail.name}</Heading>
            <Text>
              <Icon as={Users} mr={2} />
              {forumDetail.totalMembers} anggota
            </Text>
          </VStack>
          {/* <Button>
            <Icon as={PlusCircle} />
          </Button> */}
        </HStack>
      </Box>
      <Heading my={5}>Postingan</Heading>
      <Flex dir="row" justifyContent="space-between">
        <Box w="65%">
          {postLoad ? (
            <Progress isIndeterminate colorScheme="red" size="xs" />
          ) : (
            posts.map((item: any, index) => (
              <ForumCardNoInfo {...item} key={index} />
            ))
          )}
        </Box>
        <Box
          h="-webkit-fit-content"
          w="30%"
          bg="white"
          pos="sticky"
          top={40}
          borderRadius="20px"
        >
          <Stack p={6}>
            <Heading fontSize={30}>Tentang</Heading>
            <Text>{forumDetail.description}</Text>
          </Stack>
        </Box>
      </Flex>
    </Container>
  );
}
