import { Box, Flex, Heading, Image, Progress, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CourseBadge from '../../../components/CourseBadge';
import { ANIM_TRANSITION } from '../../../utils/constants';
import { isoToString } from '../../../utils/helpers/isoDateFormatter';
import { fetchAssignment } from '../api/apihandler';
import Switcher from '../switcher/Switcher';
import SwitcherButtons from '../switcher/SwitcherButtons';

export default function DashboardCard({
  classId,
  className,
  course,
  teacher,
  start,
  end,
  classImageKey,
}:
  | {
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
    }
  | any) {
  const [currentPage, setPage] = useState('aktivitas');

  const [assignmentLoading, setLoading] = useState(true);
  const [assignments, setAssignments] = useState([]);
  const { id } = useParams();

  const fetchTugas = async () => {
    await fetchAssignment(id!)
      .then((ass) => setAssignments(ass))
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchTugas()
  }, [])

  return (
    <motion.div
      initial={{ y: 80, opacity: 0 }}
      transition={{ delayChildren: 1 }}
      animate={{
        y: 0,
        opacity: 1,
        ...ANIM_TRANSITION,
      }}
      exit={{ y: 300, opacity: 0, ...ANIM_TRANSITION }}
      style={{ width: '100%', height: 'max-content' }}
    >
      <Box
        w="70%"
        position="relative"
        minH={350}
        display="inline-block"
        bgColor="white"
        borderRadius="3xl"
      >
        {/* OVERLAY */}
        <Box
          zIndex={2}
          borderTopRadius="3xl"
          h={170}
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
          h={170}
          w="full"
          objectFit="cover"
          pos="absolute"
          top={0}
          backgroundColor="black"
          src={`https://telkom-pde.s3.ap-southeast-1.amazonaws.com/${classImageKey}`}
        />
        <Box pos="relative" h="full" w="full" zIndex={3} p={4} alignItems="end">
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
            <Text mb={2} textColor="white">
              {isoToString(start)} - {isoToString(end)}
            </Text>
          </Box>
          <Flex mb={2}>
            <SwitcherButtons
              stateValue={currentPage}
              setValue={setPage}
              value="aktivitas"
            />
            <SwitcherButtons
              stateValue={currentPage}
              setValue={setPage}
              value="peserta"
            />
          </Flex>
          {assignmentLoading ? (
            <Progress size="xs" colorScheme="red" isIndeterminate />
          ) : (
            <Switcher stateValue={currentPage} props={assignments} className={className}/>
          )}
        </Box>
      </Box>
    </motion.div>
  );
}
