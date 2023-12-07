import { Box, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { yangLalu } from '../../../utils/helpers/unixToString';

type courseActivityType = {
  course_thumbnail: string;
  course_name: string;
  activity_name: string;
  date: number;
};

export default function CourseActivity({
  course_thumbnail,
  course_name,
  activity_name,
  date,
}: courseActivityType) {
  return (
    <Box my={4} display="flex" flexDir="row" alignItems="center" gap={4}>
      <Image
        objectFit="cover"
        src={course_thumbnail}
        w="50px"
        h="50px"
        borderRadius="10px"
      />
      <VStack alignItems="start">
        <Text fontWeight={500} as="h6" noOfLines={1}>
          {activity_name}
        </Text>
        <Text fontWeight={300} as="h6" color="grey">
          {course_name} - {yangLalu(date)}
        </Text>
      </VStack>
    </Box>
  );
}
