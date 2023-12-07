import { HStack, Icon, Text } from '@chakra-ui/react';
import React from 'react';
import { ThumbsUp, MessageCircle, Share2 } from 'react-feather';
import { formatAmmount } from '../../../utils/helpers/formatAmmount';

export default function BlogStats({
  likes,
  comments,
  share,
}: {
  likes: number;
  comments: number;
  share: number;
}) {
  return (
    <HStack alignItems="center" px={2} spacing={8}>
      <HStack alignItems="center" textAlign="center">
        <Icon as={ThumbsUp} h={6} w={6} />
        <Text as="h6">{formatAmmount(likes)}</Text>
      </HStack>
      <HStack alignItems="center" textAlign="center">
        <Icon as={MessageCircle} h={6} w={6} />
        <Text as="h6">{formatAmmount(comments)}</Text>
      </HStack>
      <HStack alignItems="center" textAlign="center">
        <Icon as={Share2} h={6} w={6} />
        <Text as="h6">{formatAmmount(share)}</Text>
      </HStack>
    </HStack>
  );
}
