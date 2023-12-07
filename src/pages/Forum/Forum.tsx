import { Heading, Progress, Stack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { fetchForumPosts } from './api/apihandler';
import ForumCard from './fragments/ForumCard';

export let loadForumPosts: Function;

export default function Forum() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  loadForumPosts = async () => {
    await fetchForumPosts()
      .then((data) => setPosts(data))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    loadForumPosts();
  }, []);

  if (loading) {
    return <Progress  isIndeterminate colorScheme='red' size='xs'/>;
  } else {
    return (
      <>
        <Heading fontSize={30} mb={4}>
          Aktivitas terbaru
        </Heading>
        <Stack gap={4}>
          {posts.map((item: any, index) => (
            <ForumCard {...item} key={index} />
          ))}
        </Stack>
      </>
    );
  }
}
