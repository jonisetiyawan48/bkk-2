import {
  HStack,
  VStack,
  Image,
  Text,
  Spinner,
  Skeleton,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { yangLalu } from '../../../utils/helpers/unixToString';
import { fetchUserById } from '../api/apihandler';

export default function ForumUser({ id, date }: { id: string; date: string }) {
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({ name: '' });

  const loadUser = async () => {
    await fetchUserById(id)
      .then((data) => setUser(data))
      .then(() => setLoaded(true));
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <HStack alignItems="center" p={4}>
      <VStack align="start" gap={-2}>
        <Skeleton h={5} isLoaded={loaded} mb={2}>
          <Text fontWeight={500}>{!loaded ? id : user.name}</Text>
        </Skeleton>
        <Text style={{ marginTop: 0 }} color="grey" fontWeight={300}>
          {yangLalu(date)}
        </Text>
      </VStack>
    </HStack>
  );
}
