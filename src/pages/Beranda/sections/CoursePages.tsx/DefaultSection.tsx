import React, { useEffect, useState } from 'react';
import testing2 from '../../../../testing/testing2.json';

import CourseCard from '../../fragments/CourseCard/CourseCard';
import { AnimatePresence, motion } from 'framer-motion';
import { ANIM_TRANSITION } from '../../../../utils/constants';
import { Progress } from '@chakra-ui/react';
import { fetchCourses } from '../../../Lms/api/apihandler';

export default function DefaultSection() {
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
      animate={{
        y: 0,
        opacity: 1,
        ...ANIM_TRANSITION,
      }}
      style={{ width: '100%' }}
      exit={{ y: 300, opacity: 0, ...ANIM_TRANSITION }}
    >
      {classes.map((item:any, index:number) => (
          <CourseCard {...item} key={index} />
        ))}
    </motion.div>
  );
}
}
