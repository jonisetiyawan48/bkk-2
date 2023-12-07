import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Image,
  Text,
  Box,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
} from '@chakra-ui/react';
import { Send } from 'react-feather';
import BlogStats from './BlogStats';
import BlogUser from './BlogUser';
import CommentInput from './CommentInput';
import { commentPost } from '../api/apihandler';
import { LOCAL_STORAGE_USER } from '../../../utils/constants';
import { getLocalStorage } from '../../../utils/helpers/localstorage';
import { fetchBlogs } from '../api/apihandler';


import React, { useState, useEffect } from "react";


type BlogModalType = {
  isOpen: any;
  onOpen: any;
  onClose: any;
  user: [
    {
      name: string;
      profile_icon: string;
    }
  ];
  blogId: string;
  post_image: string;
  post_body: string;
  date: string;
  likes: number;
  comments: [];
  share: number;
};

export default function BlogModal({
  isOpen,
  onClose,
  user,
  blogId,
  post_image,
  post_body,
  date,
  likes,
  comments,
  share,
}: BlogModalType) {
  const blogProps = {
    user: user,
    post_image: post_image,
    post_body: post_body,
    date: date,
    likes: likes,
    comments: comments,
    share: share,
  };

  const [commentInput, setCommentInput] = useState('')
  const [clearState, setClearState] = useState('')
  const [blogComments, setBlogComments] = useState([])
  const [blogContent, setBlog] = useState([])
  
  const addComment = async (event:any) => {
    event.preventDefault();
    let param = blogId;
    let payload = commentInput;
    await commentPost(param, payload)
    await fetchData();
    setCommentInput(clearState);    
  }

  const fetchData = async () => {
    await fetchBlogs()
      .then((data) => {
        data.map((item:any, index:any) => {
          if(blogId == item.blogId) {
            setBlogComments(item.comments)
          }
      })
  })
}
    

  useEffect(() => {
    setBlogComments(comments)    
  }, [])


  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      scrollBehavior="inside"
      motionPreset="scale"
    >
      <ModalOverlay />
      <ModalContent
        maxW={{ base: "87.5vw", sm: "xl" }}
        py={4}
        borderRadius="3xl"
      >
        <ModalBody>
          <Flex flexDirection={{ base: "column", lg: "row" }} h="100%" alignItems="stretch" gap={5}>
            <Image
              maxH="700px"
              maxW={{base: '100%', lg: "50%"}}
              src={post_image}
              objectFit="contain"
            />
            <VStack alignItems="start" justify="space-between" w={{base: '100%', lg: "50%"}}>
              <Box>
                <BlogUser name={user[0].name} date={date} />
                <Text
                  my={4}
                  overflowY="auto"
                  maxH="400px"
                  css={{
                    '&::-webkit-scrollbar': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-track': {
                      width: '4px',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      background: '#E70000',
                    },
                  }}
                >
                  {post_body}
                </Text>
              </Box>
              <Box w="full">
                <CommentInput />
              </Box>
            </VStack>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
