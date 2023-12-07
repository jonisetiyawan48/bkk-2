import {
  HStack,
  Text,
  Image,
  SkeletonCircle,
  Skeleton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchForumDetailById } from '../api/apihandler';

type forumInfoType = {
  name: string;
  image: {
    url: string;
    key: string;
  };
};

export default function ForumInfo({ forumId }: { forumId: string }) {
  const [loaded, setLoaded] = useState(false);
  const [info, setInfo] = useState({ name: '', image: { url: '' } });
  const [status, setPrivate] = useState(true);

  const fetchInfo = async () => {
    await fetchForumDetailById(forumId)
      .then((data) => {
        setPrivate((curr) => false)
        setInfo(data);
      })
      .then(() => setLoaded(true));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <Link to={status ? forumId : ''}>
      <HStack p={4}>
        {status ? (
          <>
            <SkeletonCircle isLoaded={loaded} w="32px" h="32px">
              {loaded && (
                <Image
                  objectFit="cover"
                  w="32px"
                  h="32px"
                  borderRadius="full"
                  src={info.image.url}
                />
              )}
            </SkeletonCircle>
            <Skeleton h={5} isLoaded={loaded}>
              <Text>Dari Forum {loaded && `${info.name}`}</Text>
            </Skeleton>
          </>
        ) : (
          <Text>Private</Text>
        )}
      </HStack>
    </Link>
  );
}
