import { motion } from 'framer-motion';
import testing2 from '../../../../testing/testingaktif.json';

import React, { useEffect, useState } from 'react';
import { ANIM_TRANSITION } from '../../../../utils/constants';
import CourseCard from '../../fragments/CourseCard/CourseCard';
import { Progress, Text, Spinner } from '@chakra-ui/react';
import { fetchCourses } from '../../../Lms/api/apihandler';

export default function ActiveSection() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApi = async () => {
    await fetchCourses()
      .then((data) => {
        setClasses(data);
      })
      .then(() => setLoading(false));
  };

  useEffect(() => {
    fetchApi()
  }, []);

  if (loading) {
    return <Progress size="xs" isIndeterminate colorScheme="red" w='100%'/>;
  } else {
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
        style={{ width: '100%' }}
      >
        {classes.map((item:any, index) => (
          <CourseCard {...item} key={index} />
        ))}
      </motion.div>
    );
  }
}
