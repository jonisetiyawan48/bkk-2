import { Box, Image, HStack } from '@chakra-ui/react';
import React from 'react';
import ActionsSection from './ActionsSection';
import InfoSection from './InfoSection';

type CourseCardType = {
  classImageKey: string;
  teacher: string;
  className: string;
  course: 'muatan nasional' | 'rekayasa perangkat lunak' | 'wawasan umum' | any;
  start: string;
  end: string;
  total_people: number;
  classId:string;
  totalMembers:number;
};

export default function CourseCard({
  classImageKey,
  teacher,
  className,
  course,
  start,
  end,
  totalMembers,
  classId
}: CourseCardType) {
  return (
    <Box bg="white" w="90%" p={4} borderRadius="25px" my={4}>
      <HStack gap={2} alignItems="stretch" justifyContent="space-between">
        <Image
          borderRadius="20px"
          w="200px"
          h="200px"
          objectFit="cover"
          src={`https://telkom-pde.s3.ap-southeast-1.amazonaws.com/${classImageKey}`}
        />
        <InfoSection
          lecturer={teacher}
          title={className}
          tag={course}
          startdate={start}
          enddate={end}
        />
        <ActionsSection classId={classId} totalMembers={totalMembers} />
      </HStack>
    </Box>
  );
}
