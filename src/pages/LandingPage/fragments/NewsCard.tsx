import React from 'react';
import { Box, Button, Flex, HStack, Text, useDisclosure } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import NewsModal from '../../Blog/fragments/NewsModal';

type NewsCardType = {
  title: string;
  date: string;
  imageUrl: string;
  description:string;
};

export default function NewsCard({ title, date, imageUrl,description }: NewsCardType) {
  const showNews = useDisclosure();

  return (
    <>
      <NewsModal disclosure={showNews} title={title} image={imageUrl} body={description} />
      <Box
        // maxW="450px"
        maxW={{ base: "100%", md: "450px" }}
        borderRadius="3xl"
        h={60}
        backgroundImage={`url(${imageUrl})`}
        backgroundPosition="center center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        minW={{ base: "70vw", md: "unset" }}
      >
        <Flex
          borderRadius="3xl"
          w={{ base: "100%", md: "400px" }}
          minW="100%"
          maxW="400px"
          height={60}
          bottom={0}
          p={5}
          bgGradient="linear-gradient(#0000, blackAlpha.300, blackAlpha.600, blackAlpha.700)"
          flexDir={{ base: "column", sm: "row" }}
          justifyContent={{ base: "flex-end", sm: "space-between" }}
          alignItems="end"
          placeItems={{ base: "unset", sm: "flex-end" }}
          gap={2}
        >
          <Box textColor="white" fontWeight="500">
            <Text noOfLines={2}>{title}</Text>
            <Text textColor="gray.200" fontSize={11}>{date}</Text>
          </Box>
          <NavLink to="#">
            <Button
              px={5}
              py={2}
              w={{ base: "100%", xl: "unset" }}
              borderRadius="3xl"
              bg="red_lighter"
              color="white"
              fontWeight={500}
              colorScheme="red"
              fontSize={12}
              _hover={{ bg: "red_darker" }}
              onClick={showNews.onOpen}
            >
              Selengkapnya
            </Button>
          </NavLink>
        </Flex>
      </Box>
    </>
  );
}
