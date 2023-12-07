import { Box, GridItem, Text, Image, useDisclosure } from "@chakra-ui/react";

import React, { useState, useEffect } from "react";
import BlogModal from "./BlogModal";
import BlogUser from "./BlogUser";
import BlogStats from "./BlogStats";
import { ThumbsUp, MessageCircle, Share2, Bookmark } from "react-feather";
import { likePost, unlikePost } from "../api/apihandler";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";
import { getLocalStorage } from "../../../utils/helpers/localstorage";

type BlogCardType = {
  user: [
    {
      name: string;
      profile_icon: string;
    }
  ];
  blogId: string;
  blogImageUrl: string;
  description: string;
  date: string;
  createdAt: string;
  likes: number;
  likedBy: [];
  comments: [];
  share: number;
  blogTitle: string;
  newsTitle: string;
};

export default function BlogCard({
  user,
  blogId,
  blogImageUrl,
  description,
  date,
  likes,
  likedBy,
  comments,
  share,
  blogTitle,
  createdAt,
  newsTitle,
}: BlogCardType) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const blogProps = {
    blogId: blogId,
    user: user,
    blogImageUrl: blogImageUrl,
    description: description,
    date: date,
    likes: likes,
    comments: comments,
    share: share,
    createdAt: createdAt,
  };

  const credential = getLocalStorage(LOCAL_STORAGE_USER);

  const like = () => {
    let param = blogId;
    likePost(param);
  };

  const checkLiked = () => {
    {
      likedBy.map((item: any, index: any) =>
        item.userId == credential.userId ? setColor("red") : null
      );
    }
  };

  const unLike = () => {
    let param = blogId;
    unlikePost(param);
  };
  const [color, setColor] = useState("black");
  const [likesCount, setLikesCount] = useState(likes);

  useEffect(() => {
    checkLiked();
  }, []);

  return (
    <GridItem colSpan={1}>
      <BlogModal
        {...blogProps}
        post_body={description}
        post_image={blogImageUrl}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        date={date || createdAt}
      />
      <Box bgColor="white" borderRadius="3xl" pb={4}>
        <Box px={6} py={4}>
          <BlogUser name={user[0].name} date={date || createdAt} />
        </Box>
        <Box
          justifyContent="center"
          display="flex"
          h={{base: "450px", lg: "300px", xl: "450px"}}
          cursor="pointer"
          transition="200ms"
          onClick={onOpen}
          bg={`url(${blogImageUrl})`}
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
              src={blogImageUrl}
              objectFit="contain"
            />
          </Box>
        </Box>
        <Text px={6} my={4} noOfLines={2} overflow="hidden">
          <strong>{user[0].name} </strong>
          {blogTitle || newsTitle}
        </Text>
        <Box display="flex" px={6}>
          <Box display="flex" px={1} justifyContent="center">
            <span
              onClick={() =>
                color === "black"
                  ? (setColor("red"), like(), setLikesCount(likesCount + 1))
                  : (setColor("black"), unLike(), setLikesCount(likesCount - 1))
              }
            >
              <ThumbsUp cursor="pointer" color={color} />
            </span>
            <Text px={1}>{likesCount}</Text>
          </Box>
          <Box display="flex" px={1} justifyContent="center">
            <Box onClick={onOpen} transition="200ms">
              <MessageCircle cursor="pointer" />
            </Box>
            <Text px={1}>{comments.length}</Text>
          </Box>
        </Box>
      </Box>
    </GridItem>
  );
}
