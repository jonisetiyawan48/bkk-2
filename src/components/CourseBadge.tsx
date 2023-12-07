import { Badge } from '@chakra-ui/react';
import ColorValues from './badgecolorvalues.json';
import React from 'react';

export default function CourseBadge({
  tag,
}: {
  tag:
    | 'muatan nasional'
    | 'rekayasa perangkat lunak'
    | 'wawasan umum'
    | 'nasional'
}) {
  return (
    <Badge
      objectFit="contain"
      textTransform="capitalize"
      fontSize={17}
      px={2}
      py={2}
      borderRadius="2xl"
      fontWeight={500}
      {...ColorValues[tag]}
    >
      {tag}
    </Badge>
  );
}
