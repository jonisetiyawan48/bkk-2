import React, {useState, useEffect} from 'react';
import { Container, Heading, HStack, Box } from '@chakra-ui/react';
import NewsCard from '../fragments/NewsCard';
import { getDate } from '../../../utils/helpers/unixToString';
import Carousel from 'react-multi-carousel';
import styled from '@emotion/styled';

import { Progress } from '@chakra-ui/react';
import { fetchNews } from '../api/apihandler';

export let fetchAllNews: Function;

const CardStyle = styled.div`
  li {
    margin: 0 5px;
  }
`;

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function NewsSection() {

  const [newsList, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  fetchAllNews = async () => {
    await fetchNews()
      .then((data) => {
        setList(data);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchAllNews();
  }, []);

  if (loading) {
    return <Progress colorScheme="teal" isIndeterminate size="xs" />;
  }
  else if (!newsList.length)
    return <Box></Box>;
  
  return (
    
    <Box
      maxW={{ base: "90%", sm: "77%" }}
      mx="auto" mb={24}>
      <Heading my={4}>Berita terkini</Heading>
      <Container
        pl={"15%"}
        pb={5}
        pr={40}
        mx={"-15.1%"}
        w="100vw"
        maxW="100vw"
        overflowX="auto"
      >
        <HStack
          gap={2}
          mr={40}
          _after={{
            content: '""',
            display: "block",
            paddingRight: "15%",
            minHeight: "10rem",
          }}
        >
          {newsList.map((item:any, index:any) => (
            <NewsCard
              title={item.newsTitle}
              date={getDate(Date.parse(item.createdAt))}
              imageUrl={item.newsImageUrl}
              description={item.description}
              key={index}
            />
          ))}
        </HStack>
      </Container>
    </Box>
  );
}
