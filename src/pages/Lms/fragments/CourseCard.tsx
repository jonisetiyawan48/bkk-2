import { Badge, Box, Heading, Image, Text, Button } from '@chakra-ui/react';
import { Users } from 'react-feather';

import React from 'react';
import ColorValues from '../../../components/badgecolorvalues.json';
import CourseBadge from '../../../components/CourseBadge';
import { Link } from 'react-router-dom';
import { isoToString } from '../../../utils/helpers/isoDateFormatter';

export default function CourseCard({
  classId,
  className,
  course,
  teacher,
  start,
  end,
  classImageKey,
  totalMembers
}: {
  classId: string;
  className: string;
  course:
    | 'muatan nasional'
    | 'rekayasa perangkat lunak'
    | 'wawasan umum'
    | 'nasional';
  teacher: string;
  start: string;
  end: string;
  classImageKey: string;
  totalMembers:number;
}) {
  return (
    <Box
      w="100%"
      minH={350}
      position="relative"
      bgColor="white"
      borderRadius="3xl"
    >
      <Box pos="absolute" h="full" w="full" zIndex={3} p={4} alignItems="end">
        <Box
          h="50%"
          display="flex"
          flexDir="column"
          justifyContent="end"
          textColor="white"
          py={4}
        >
          <Heading fontWeight={500}>{className}</Heading>
          <Text>{teacher}</Text>
        </Box>
        <Box py={4} pos="relative">
          <Text mb={2}>
            {isoToString(start)} - {isoToString(end)}
          </Text>
          <CourseBadge tag={course} />
        </Box>
        <Box display="flex" justifyContent="space-between" mt={2}>
          <Box display="flex" alignItems="center" gap={3}>
            <Users />
            {totalMembers} peserta
          </Box>
          <Link to={classId}>
            <Button
              borderRadius="18px"
              p={6}
              bg="red_lighter"
              colorScheme="red"
              fontWeight={500}
            >
              Lihat Aktivitas
            </Button>
          </Link>
        </Box>
      </Box>
      <Box
        zIndex={2}
        borderTopRadius="3xl"
        h="50%"
        w="full"
        objectFit="cover"
        pos="absolute"
        top={0}
        opacity={0.4}
        backgroundColor="black"
      />
      <Image
        zIndex={1}
        borderTopRadius="3xl"
        h="50%"
        w="full"
        objectFit="cover"
        pos="absolute"
        top={0}
        backgroundColor="black"
        src={`https://telkom-pde.s3.ap-southeast-1.amazonaws.com/${classImageKey}`}
      />
    </Box>
  );
}
