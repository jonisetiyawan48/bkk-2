import React, { useEffect, useState } from 'react';
import BlogCard from '../fragments/BlogCard';
import { ANIM_TRANSITION } from '../../../utils/constants';
import { motion } from 'framer-motion';
import { Grid, Progress } from '@chakra-ui/react';
import { fetchBlogs } from '../api/apihandler';

let reloadBlog: Function;

export default function BlogsSection() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  reloadBlog = async () => {
    await fetchBlogs()
      .then((data) => setPosts(data.reverse()))
      .then(() => setLoading(false));      
  };

  useEffect(() => {
    reloadBlog();
  }, []);

  if (loading) {
    return <Progress size="xs" isIndeterminate colorScheme="red" />;
  } else {
    return (
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          ...ANIM_TRANSITION,
        }}
        style={{ width: '100%' }}
        exit={{ y: 300, opacity: 0, ...ANIM_TRANSITION }}
      >
        <Grid templateColumns={{base: "repeat(1, 1fr)", md: "repeat(2, 1fr)"}} gap={4}>
          {posts.map((item: any, index) => (
            <BlogCard {...item} key={index} />
          ))}
        </Grid>
      </motion.div>
    );
  }
}

export { reloadBlog };
